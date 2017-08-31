(function () {
    
    function exclusiveChangeEvent(event) {
        event.preventDefault();
        var opId;
        (event.target.parentNode.classList.contains("most{%= CurrentADC.InstanceId %}")) ? opId = "least" : opId = "most"
        var id_resp = event.target.id.substr(event.target.id.length-1, 1);
    	if (event.target.checked) {
            var opposite = document.querySelector("." + opId + "{%= CurrentADC.InstanceId %} [id$='"+ id_resp +"']");
            opposite.checked = false;
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
        var buttons = document.querySelectorAll("#adc_{%= CurrentADC.InstanceId %} input");
		for (var i=0; i<buttons.length; ++i) {
            buttons[i].addEventListener("change", exclusiveChangeEvent);
            buttons[i].addEventListener("change", changeColor);
            buttons[i].addEventListener("input", changeColor);
        }
    }
            
    var cells = document.querySelectorAll("[class*='least']")
    for(i=0; i<cells.length; i++) {
        cells[i].addEventListener("click", (function(e){
			if (event.target.firstElementChild != null) {
                e.preventDefault();
                e.target.firstElementChild.checked = true;
                // Create the event
                var eventTrig = new CustomEvent("change", {});
                // Dispatch/Trigger/Fire the event
                event.target.firstElementChild.dispatchEvent(eventTrig);
            }
		}));
    }
            
    var cells = document.querySelectorAll("[class*='most']")
    for(i=0; i<cells.length; i++) {
        cells[i].addEventListener("click", (function(e){
			if (event.target.firstElementChild != null) {
                e.preventDefault();
                e.target.firstElementChild.checked = true;
				// Create the event
                var eventTrig = new CustomEvent("change", {});
                // Dispatch/Trigger/Fire the event
                event.target.firstElementChild.dispatchEvent(eventTrig);
            }
		}));
    }
	/**   
   	if (window.askia 
    	&& window.arrLiveRoutingShortcut 
        && window.arrLiveRoutingShortcut.length > 0
        && (window.arrLiveRoutingShortcut.indexOf({%= CurrentQuestion.Shortcut %}) >= 0)) {
        askia.triggerAnswer();
   	}**/
          
	var inputs = document.querySelectorAll(".respCol");
   	for(i=0; i< inputs.length; ++i) {
        console.log(inputs[i].firstElementChild.checked);
    }
     
    restrictEvent();
}());
        
        