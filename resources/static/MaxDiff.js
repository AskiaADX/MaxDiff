(function () {
    
    var instanceId = 1;
    var currentQuestion = '';
    var leastQuestion = '';
    
    /**
   * Trigger the DOM event
   *
   * @param {HTMLElement} obj HTMLElement to trigger the event on
   * @param {String} type Type of the event to trigger
   */
    function triggerEvent(obj, type) {
        // This a little ugly for the moment only register the change event to
        // be an HTMLEvents, all other are consider as MouseEvents
        // we can refine this function if needed
        var eventType = (type === 'change') ? 'HTMLEvents' : 'MouseEvents';
        if (document.createEvent) {
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent(type, true, false);
            obj.dispatchEvent(evt);
        } else if (document.createEventObject) {
            obj.fireEvent('on' + type);
        } else if (typeof obj['on' + type] == 'function') {
            obj['on' + type]();
        }
    }
    
    function exclusiveChangeEvent(event) {
        event.preventDefault();
        var opId;
        (event.target.parentNode.classList.contains("most" + instanceId)) ? opId = "least" : opId = "most"
        var id_resp = event.target.id.substr(event.target.id.length-1, 1);
    	if (event.target.checked) {
            var opposite = document.querySelector("." + opId + instanceId + " [id$='"+ id_resp +"']");
            opposite.checked = false;
            if (window.askia 
            && window.arrLiveRoutingShortcut 
            && window.arrLiveRoutingShortcut.length > 0
            && (window.arrLiveRoutingShortcut.indexOf(currentQuestion) >= 0
               || window.arrLiveRoutingShortcut.indexOf(leastQuestion) >= 0)) {
            askia.triggerAnswer();
        	}
        }
    }
                                                  
                                                         
	function changeColor(e) {
		e.preventDefault();
        var opId
        var cellsList;
		cellsList = document.querySelectorAll(".respCol");
        for(var i=0; i<cellsList.length; ++i){
            selected = cellsList[i].firstElementChild.checked;
            if(selected) {
                cellsList[i].className += " selected";
            } else {
                cellsList[i].classList.remove("selected");
            }
        }
    }
 
    function restrictEvent() {
        var buttons = document.querySelectorAll("#adc_" + instanceId + " input");
		for (var i=0; i<buttons.length; ++i) {
            buttons[i].addEventListener("change", exclusiveChangeEvent);
            buttons[i].addEventListener("change", changeColor);
            buttons[i].addEventListener("input", changeColor);
        }
    }

	function MaxDiff (options) {
        this.options = options;
    	instanceId = options.instanceId || 1;
        currentQuestion = options.currentQuestion || '';
        leastQuestion = options.leastQuestion || '';
        
        var cells = document.querySelectorAll("[class*='least']")
        for(i=0; i<cells.length; i++) {
            cells[i].addEventListener("click", (function(e){
                if (event.target.firstElementChild != null) {
                    e.preventDefault();
                    e.target.firstElementChild.checked = true;
                    triggerEvent(event.target.firstElementChild,'change');
                }
            }));
        }

        var cells = document.querySelectorAll("[class*='most']")
        for(i=0; i<cells.length; i++) {
            cells[i].addEventListener("click", (function(e){
                if (event.target.firstElementChild != null) {
                    e.preventDefault();
                    e.target.firstElementChild.checked = true;
                    triggerEvent(event.target.firstElementChild,'change');
                }
            }));
        }

        restrictEvent();
    }

    /**
      * Attach the MaxDiff to the window object
      */
    window.MaxDiff = MaxDiff;

}());
        
        