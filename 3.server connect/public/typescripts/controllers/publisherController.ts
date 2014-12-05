import socket = require('../socket');

//
// before
//
//var iceSeparator:string = '------ ICE Candidate -------';
//var CR:string = String.fromCharCode(13);

interface PublisherScope extends ng.IScope {
    /** メディアStream */
    stream: any;
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
    //
    ///** SDP(Offer)受信ボタン押下時 */
    //onClickSDPReceivedBtn() : void;
    ///** ICE受信ボタン押下時 */
    //onICEReceivedBtn() : void;
}

var PublisherController = ($scope:PublisherScope, $window:ng.IWindowService):void => {

    /**
     * 画面表示時の処理
     */
    (():void => {
        // デバイスのカメラに接続
        console.log('Camera Connecting ...');
        $window.navigator.webkitGetUserMedia({video: true, audio: false},
            (stream:any)  => {
                console.log('Camera Connected.');

                $scope.stream = stream;
                $scope.cameraUrl = $window.URL.createObjectURL(stream);
                $scope.$digest();
            },
            (err:Error) => {
                console.log('Camera Connect Error.');
            }
        );
    })();

    /**
     * SDP(Offer)受信ボタン押下時
     */
    //
    // before
    //
    //$scope.onClickSDPReceivedBtn = ():void => {
    socket.on('offer', (sdpOffer:any) =>{
        console.log('onRecieved Offer SPD');

        //var sdpOffer = JSON.parse($scope.offerSDP);

        var mediaConstraints:RTCMediaConstraints = {
            'mandatory': {
                'OfferToReceiveAudio': true,
                'OfferToReceiveVideo': true
            }
        };
        $scope.peerConnection = new webkitRTCPeerConnection({iceServers: []});

        // 受信側のSDPを接続先のSDPとして設定
        $scope.peerConnection.setRemoteDescription(new RTCSessionDescription(sdpOffer));

        // 配信用の動画Steram設定
        $scope.peerConnection.addStream($scope.stream);

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
            //$scope.$digest();
            socket.emit('iceCandidate', candidate);
        };

        /**
         * SDP(Answer) の生成
         */
        $scope.peerConnection.createAnswer((sdp:RTCSessionDescription):void => {
            console.log('Created Answer SDP.');

            $scope.peerConnection.setLocalDescription(sdp);
            //
            // before
            //
            //$scope.answerSDP = JSON.stringify(sdp);
            //$scope.$digest();
            socket.emit('answer', sdp);
        }, (errorInformation:DOMError) => {
            console.log('Create Answer failed:' + errorInformation.toString());
        }, mediaConstraints);
    });

    /**
     * ICE受信ボタン押下時
     */
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