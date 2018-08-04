var getHeader = function() {
					if(window.XMLHttpRequest) {
						var xhr = new XMLHttpRequest();
						var header = document.getElementById("main-header");
						var nav = document.getElementById("main-nav");
						xhr.open("GET", "../data/header.html?random=" + Math.random(), true);
						xhr.onreadystatechange = function() {
							if(xhr.readyState == 4 && xhr.status == 200) {
								var temp = document.createElement("div");
								temp.innerHTML = xhr.responseText;
								header.innerHTML = temp.querySelectorAll(".main-header")[0].innerHTML;
								nav.innerHTML = temp.querySelectorAll(".main-nav")[0].innerHTML;
							}
						}
						xhr.send();
					}
				}();