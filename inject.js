(function () {
	var peer = null
	var peerId = null
	var conn = null
	var opponent = {
		peerId: null
	};
	element = null;
	window.getVideos = function () {
		console.log(arguments);
		element = arguments;
	}(document);

	function initialize() {
		peer = new Peer('', {
				host: 'hefesoftartegee.herokuapp.com',
				port: 443,
				path: '/peerjs',
				debug: 3,
				config: {
					'iceServers': [{
						url: 'stun:stun.l.google.com:19302'
					}, ]
				} /* Sample servers, please use appropriate ones */
			},

		)
		peer.on('open', function (id) {
			peerId = id
		})
		peer.on('error', function (err) {
			alert('' + err)
		})

		// Heroku HTTP routing timeout rule (https://devcenter.heroku.com/articles/websockets#timeouts) workaround
		function ping() {
			console.log(peer)
			peer.socket.send({
				type: 'ping'
			})
			setTimeout(ping, 16000)
		}
		ping()
	};

	(function start() {
		initialize()
		peer.on('connection', function (c) {
			if (conn) {
				c.close()
				return
			}
			conn = c
			turn = true
		})

		var destId = prompt("Opponent's peer ID:")
		document.getElementsByTagName('video')[0].play();
		var stream = document.getElementsByTagName('video')[0].captureStream()
		peer.call(destId, stream);
	})();
})();