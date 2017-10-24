!function(w,$){
	let storage = w.localStorage,api,
	isinit=0,
	lrc=[],
	haslrc=0,
	lrcbox,
	oldtxt,
	list=[],
	sec=0,
	//配置文件
	cfg={
		id:storage.id||-1,
		state:storage.state||1,
		index:storage.index||0,
		time:storage.time||0,
		get:key=>storage[key]||cfg[key],
		set:(key,val)=>{cfg[key]=storage[key]=val}
	},
	loadlrc=_=> fetch('https://api.imjad.cn/cloudmusic/?type=lyric&id='+list[cfg.get('index')][0])
		.then(resp=>resp.json())
		.then(lrcjson=>{
			lrc = [];
			lrcbox.text(oldtxt);
			if(lrcjson&&!lrcjson.nolyric){
				lrcjson.lrc.lyric.split('\n').forEach(lrcline=>{
					let lrc_txt = /(?:\[\d+:\d+\.\d+\])+(.*)/g.exec(lrcline);
					lrc_txt&&lrcline.match(/\[\d+:\d+.\d+\]/g).forEach(time=>{
						time= /\[(\d+):(\d+)\.(\d+)\]/.exec(time);
						lrc[60*time[1]+1*time[2]] = lrc_txt[1];
					})
				})
				haslrc = 1;
			}else{
				haslrc = 0;
			}
		}),
	//播放器核心
	core = {
		id:Date.now(),
		player:new Audio,
		play:index=>{
			cfg.set('id',core.id);
			let curr = 0
			if(index==null||index==cfg.get('index')){
				index = cfg.get('index');
				curr = cfg.get('time');
			}else{
				lrc = [];
				lrcbox.text(oldtxt);
				cfg.set('index',index);
				cfg.set('time',0);
				haslrc = 0;
			}
			haslrc||loadlrc();
			fetch('https://api.imjad.cn/cloudmusic/?type=song&id='+list[index][0])
			.then(resp=>resp.json())
			.then(json=>{
				if(json.code==200){
					core.player.src = api+json.data[0].url;
					core.player.currentTime = curr;
					cfg.set('state',1);
					ui.update();
					core.player.play();
				}else{
					core.next();//获取歌曲地址失败的时候直接跳至下一曲
				}
			})
		},
		pause:_=>{core.player.pause();cfg.set('state',0);lrcbox.text(oldtxt)},
		next:_=>{
			let index = ~~cfg.get('index');
			core.play(++index>=list.length?0:index);
		},
		initplay:_=>{
			$(core.player).on('timeupdate',_=>{
				cfg.get('id')!=core.id&&core.pause();
				let curr = Math.floor(core.player.currentTime);
				cfg.set('time',core.player.currentTime)
				if(haslrc&&curr!=sec){
					sec = curr;
					lrc[curr]&&lrcbox.text(lrc[curr]);
				}
			}).on('ended error',core.next)
		}
	},
	//频谱
	spectrum = {
		enable:1,
		canvas:null,
		height:300,
		canvas_width:0,
		canvas_height:0,
		ctx:null,
		analyser:null,
		gradient:null,
		meter_num:null,
		meter_width:10,
		gap:1,
		cap_height:2,
		cap_color:'#79acdf',
		cap_y_position:[],
		init:_=>{
			spectrum.canvas = $('<canvas style="width:100%;height:'+spectrum.height+'px;position:fixed;bottom:0;left:0;z-index:0"></canvas>').attr({width:w.innerWidth,height: spectrum.height}).appendTo('body')[0];
			spectrum.canvas_width = spectrum.canvas.width;
			spectrum.canvas_height = spectrum.canvas.height - spectrum.cap_height,
			spectrum.meter_num = spectrum.canvas_width / (spectrum.meter_width+spectrum.gap);
			spectrum.ctx = spectrum.canvas.getContext('2d');
			w.AudioContext = w.AudioContext||w.webkitAudioContext;
			let audio_ctx = new AudioContext();
			spectrum.analyser = audio_ctx.createAnalyser();
			audio_ctx.createMediaElementSource(core.player).connect(spectrum.analyser);
			spectrum.analyser.connect(audio_ctx.destination);
			spectrum.gradient = spectrum.ctx.createLinearGradient(0,0,0,spectrum.canvas_height);
			spectrum.gradient.addColorStop(1,'#79acdf');
			spectrum.gradient.addColorStop(0,'#79f8df');
			spectrum.renderFrame();
		},
		renderFrame:_=>{
			spectrum.ctx.clearRect(0,0,spectrum.canvas_width,spectrum.canvas_height+spectrum.cap_height);
			if(!spectrum.enable) return;
			let array = new Uint8Array(spectrum.analyser.frequencyBinCount);
			spectrum.analyser.getByteFrequencyData(array);
			let step = Math.round(array.length*.7 / spectrum.meter_num);
			spectrum.ctx.clearRect(0, 0, spectrum.cwidth, spectrum.canvas_height);
			for (let i = 0; i < spectrum.meter_num; i++) {
				let value = array[i * step]*spectrum.canvas_height/spectrum.height;
				if (spectrum.cap_y_position.length < Math.round(spectrum.meter_num)) {
					spectrum.cap_y_position.push(value)
				}
				spectrum.ctx.fillStyle = spectrum.cap_color;
				if (value < spectrum.cap_y_position[i]) {
					spectrum.ctx.fillRect(i * (spectrum.meter_width+spectrum.gap), spectrum.canvas_height - (--spectrum.cap_y_position[i]), spectrum.meter_width, spectrum.cap_height);
				} else {
					spectrum.ctx.fillRect(i * (spectrum.meter_width+spectrum.gap), spectrum.canvas_height - value, spectrum.meter_width, spectrum.cap_height);
					spectrum.cap_y_position[i] = value;
				}
				spectrum.ctx.fillStyle = spectrum.gradient;
				spectrum.ctx.fillRect(i * (spectrum.meter_width+spectrum.gap), spectrum.canvas_height - value + spectrum.cap_height, spectrum.meter_width, spectrum.canvas_height);
			}
			requestAnimationFrame(spectrum.renderFrame);
		},
		start:_=>{if(!spectrum.enable){spectrum.enable = 1;spectrum.renderFrame()}},
		stop:_=>spectrum.enable = 0
	},
	//播放器UI控制
	ui={
		html:$('<div id="dplay"><i class="dptitle"></i><i class="dpcontrol"><i></i></i><i class="dpnext"></i><i class="dplist"><i></i><ul class="dpplaylist"></ul></i></div>'),
		init:_=>{
			$('<style>#dplay{top:0;left:-206px;position:fixed;z-index:9998;background:rgba(255,255,255,.6);width:240px;height:34px;box-shadow:0 0 0 1px #ddd inset;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}#dplay:hover{left:0}#dplay,#dplay *{transition:all .3s ease-in-out;font-size:12px;margin:0;padding:0;font-family:PingFang SC,Microsoft YaHei}#dplay i{font-style:normal}#dplay>i{height:34px;line-height:34px;position:absolute;top:0;text-align:center;cursor:pointer;width:34px}#dplay .dptitle{left:0;width:138px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center;-webkit-user-select:none}#dplay .dptitle:hover{width:240px}#dplay .dptitle:hover~i{opacity:0}#dplay .dpcontrol{left:138px}#dplay .dpnext{left:172px}#dplay .dplist{left:206px}#dplay:hover>i{box-shadow:none}#dplay input{display:none}.dpcontrol i{position:absolute;top:50%;left:50%;border-color:transparent;border-style:solid;border-left-color:currentColor;transition-property:border-width,width,height,transform,border-color !important;width:0;height:0;border-width:8px 0 8px 12px;transform:translate(-4px,-50%)}.dpcontrol.play i{width:4px;height:15px;border-width:0 4px;transform:translate(-50%,-50%);border-right-color:currentColor}.dpnext:before{content:"";position:absolute;top:50%;left:50%;width:0;height:0;border-color:transparent;border-style:solid;border-width:7px 8px;transform:translate(-7px,-50%);border-left-color:currentColor}.dpnext:after{content:"";position:absolute;top:50%;left:50%;width:0;height:14px;border-right:5px solid currentColor;transform:translate(2px,-50%)}.dplist i{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:3px;height:3px;background:currentColor;border-radius:1.5px}.dplist i:before,.dplist i:after{content:"";position:absolute;height:100%;width:100%;background:currentColor;transition:all .3s ease-in-out !important;border-radius:1.5px}.dplist i:before{left:-6px;top:0}.dplist i:after{bottom:0;right:-6px}.dplist:hover i{width:15px;height:3px;border-radius:0}.dplist:hover i:before{left:0;top:-5px;border-radius:0}.dplist:hover i:after{right:0;bottom:-5px;border-radius:0}.dptitle,#dplay>i:hover{box-shadow:0 -1px 0 #3354aa inset;color:#3354aa}.dpplaylist{position:absolute;top:33px;z-index:-1;right:0;width:240px;overflow-y:auto;max-height:168px;background:rgba(255,255,255,.6);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);-webkit-overflow-scrolling:touch}.dpplaylist::-webkit-scrollbar{width:1px;height:1px}.dpplaylist::-webkit-scrollbar-track-piece{background:#ddd}.dpplaylist::-webkit-scrollbar-thumb{background:#3354aa}.dpplaylist li{counter-increment:i;list-style:none;color:#444;text-align:left;position:relative;font-size:12px;text-indent:8px;height:0;width:100%;overflow:hidden;line-height:28px;opacity:0}.dpplaylist li:nth-child(odd){background:rgba(0,0,0,.05)}.dpplaylist li:before{content:counter(i)". ";display:inline-block;width:20px;text-indent:0}.dpnow:before{content:"> " !important;color:red}.dpnow:after{content:""}.dpplaylist li:after{height:20px;width:3px;top:4px;left:0;position:absolute;background:#3354aa}.dpplaylist li:hover,.dpplaylist .dpnow{color:#3354aa !important}.dpplaylist li:hover:after,.dpplaylist .dpnow:after{content:""}#dplay .dplist:hover ul{box-shadow:0 0 0 1px #ddd inset}#dplay .dplist:hover ul li{opacity:1;height:28px;transition-delay:.3s}</style>').html(ui.css).appendTo('body');
			let listhtml = '';
			list.forEach(mp3=> listhtml+='<li>'+mp3[1]+'</li>');
			ui.html.appendTo('body')
				.on('click','.dpcontrol',_=>core[$('#dplay .dpcontrol').toggleClass('play').hasClass('play')?'play':'pause']())
				.on('click','.dpnext',core.next)
				.on('click','.dpplaylist li',e=>{
					let li = $(e.target);
					if(!li.hasClass('dpnow')){
						core.play(li.addClass('dpnow').index());
					}else if(!~~cfg.get('state')){
						core.play();
					}
				}).find('.dpplaylist').html(listhtml)
				ui.update();
				
		},
		update:_=>{
			ui.html.find('.dptitle').text(list[cfg.get('index')][1]);
			ui.html.find('.dpcontrol').attr('class',~~cfg.get('state')?'dpcontrol play':'dpcontrol');
			ui.html.find('.dpplaylist .dpnow').removeClass('dpnow');
			ui.html.find('.dpplaylist li:eq('+cfg.get('index')+')').addClass('dpnow');
		}
	}
	w.playmusic = (selector,listid,userapi)=>{
		if(!isinit){
			isinit = 1;
			lrcbox = $(selector);
			oldtxt = lrcbox.text();
			api = userapi||'';
			// 备用地址配置请求头
			// var headers = new Headers();					
			// headers.append('Accept', 'application/json');
			// var request = new Request('https://www.emlice.top/api/playlist/detail?id=' + listid, {
			// 	headers: headers,
			// 	method: 'GET'
			// });
			fetch('https://api.imjad.cn/cloudmusic/?type=playlist&id='+listid+'&_='+Date.now())		
			// fetch(request)			// 备用地址
			.then(resp=>resp.json())
			.then(json=>{
				if(json.code==200){
					for(let track of json.playlist.tracks){
						list.push([track.id,track.name])
					}
					if(json.playlist.trackCount>0){
						if(cfg.get('index')>=json.playlist.trackCount) cfg.set('index',0);//列表有更新过，且历史的index大于当前列表长度则归为0
						cfg.set('id',core.id);
						core.initplay();
						cfg.get('state')==1&&core.play();
						if(!/Firefox/i.test(navigator.userAgent)&&userapi){
							spectrum.init();
							$(w).on('resize',_=>{
								spectrum.canvas_width = spectrum.canvas.width = w.innerWidth;
								spectrum.meter_num = spectrum.canvas_width / (spectrum.meter_width+spectrum.gap);
							})
							navigator.getBattery&&navigator.getBattery().then(battery=>{
								spectrum[battery.charging?'start':'stop']();
								battery.onchargingchange = _=> spectrum[battery.charging?'start':'stop']()
							})
						}
						ui.init();
					}
				}
			})
		}
	}
}(window,$)
//参数1：歌词容器选择器，参数2：歌单id，参数3：歌曲重定向地址，用于欺骗浏览器音频跨域显示频谱
// playmusic('.description','432778620');