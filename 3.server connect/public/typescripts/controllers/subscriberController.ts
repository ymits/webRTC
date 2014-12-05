import socket = require('../socket');

//
// before
//
//var iceSeparator:string = '------ ICE Candidate -------';
//var CR:string = String.fromCharCode(13);

interface SubscriberScope extends ng.IScope {
    /** PtoP 接続コネクション */
    peerConnection: webkitRTCPeerConnection;

    /** ビデオ表示用のURL */
    cameraUrl: string;
    //
    // before
    //
    ///** 申請用のSDP */
    //offerSDP: string;
    ///** 応答用のSDP */
    //answerSDP: string;
    ///** ICE候補 */
    //iceCandidates: string;
    ///** 接続先のICE候補 */
    //remoteIceCandidates: string;


    /** 接続ボタン押下時 */
    onClickConnectBtn() : void;
    //
    // before
    //
    ///** SDP(Answer)受信ボタン押下時 */
    //onClickSDPReceivedBtn() : void;
    ///** ICE受信ボタン押下時 */
    //onICEReceivedBtn() : void;
}

var PublisherController = ($scope:SubscriberScope):void => {

    /**
     * 画面表示時の処理
     */
    (():void => {
        console.log('Before Connect Request.');
    })();

    /**
     * 接続ボタン押下時
     */
    $scope.onClickConnectBtn = () => {
        console.log('onClickConnectBtn');

        var mediaConstraints:RTCMediaConstraints = {
            'mandatory': {
                'OfferToReceiveAudio': true,
                'OfferToReceiveVideo': true
            }
        };
        $scope.peerConnection = new webkitRTCPeerConnection({iceServers: []});

        /**
         * ICEが生成された時
         *
         * @param event
         */
        $scope.peerConnection.onicecandidate = (event:RTCIceCandidateEvent):void => {
            if (!event.candidate) {
                return;
            }
            console.log('Created ICE Candidate.');

            var candidate = {
                type: "candidate",
                sdpMLineIndex: event.candidate.sdpMLineIndex,
                sdpMid: event.candidate.sdpMid,
                candidate: event.candidate.candidate
            };
            //
            // before
            //
            //if ($scope.iceCandidates) {
            //    $scope.iceCandidates += CR + iceSeparator + CR + JSON.stringify(candidate) + CR;
            //} else {
            //    $scope.iceCandidates = JSON.stringify(candidate);
            //}
            //
            //$scope.$digest();
            socket.emit('iceCandidate', candidate);
        };

        /**
         * 動画配信側がメディアStreamを設定した時
         *
         * @param event
         */
        $scope.peerConnection.onaddstream = (event:RTCMediaStreamEvent):void => {
            console.log('receive media stream of publisher');

            $scope.cameraUrl = window.URL.createObjectURL(event.stream);
            $scope.$digest();
        };

        /**
         * SDP(Offer) の生成
         */
        $scope.peerConnection.createOffer((sdp:RTCSessionDescription):void => {
            console.log('Created Offer SDP.');

            $scope.peerConnection.setLocalDescription(sdp);
            //
            // before
            //
            //$scope.offerSDP = JSON.stringify(sdp);
            //$scope.$digest();
            socket.emit('offer', sdp);
        }, (errorInformation:DOMError) => {
            console.log('Create Offer failed:' + errorInformation.toString());
        }, mediaConstraints);
    };

    /**
     * SDP(Answer)受信ボタン押下時
     */
        //
        // before
        //
        //$scope.onClickSDPReceivedBtn = ():void => {
    socket.on('answer', (sdpAnswer:any)=> {
        console.log('onRecieved Answer SPD');

        //var sdpAnswer = JSON.parse($scope.answerSDP);
        $scope.peerConnection.setRemoteDescription(new RTCSessionDescription(sdpAnswer));
    });

    /**
     * ICE受信ボタン押下時
     */
        //
        // before
        //
        //$scope.onICEReceivedBtn = ():void => {
    socket.on('iceCandidate', (candidate:any)=> {
        console.log('onRecieved ICE Candidate');
        //var arr:string[] = $scope.remoteIceCandidates.split(iceSeparator);
        //arr = arr.map((candidate:string)=> JSON.parse(candidate))
        //arr.forEach((candidateObj:any) => {
        //    var candidate = new RTCIceCandidate({
        //        sdpMLineIndex: candidateObj.sdpMLineIndex,
        //        sdpMid: candidateObj.sdpMid,
        //        candidate: candidateObj.candidate
        //    });
        //    $scope.peerConnection.addIceCandidate(candidate);
        //});
        $scope.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });
};

export = PublisherController;