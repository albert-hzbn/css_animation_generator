var elemInd = 0,
	elemsAdded = {},
	genSElem = {},
	mouseX = 0,
	mouseY = 0, // Stores x & y coordinates of the mouse pointer
	x_elem = 0,
	y_elem = 0,
	selElemId = {
		current: null,
		previous: null
	},
	previousId = null,
	incDecSelected = false,
	incDecSelectedY, incDecSelectedElem,
	incDecTransformSelected = false,
	incDecTransformSelectedY, incDecTransformSelectedElem, keyframeElems = {},
	genSubframeElems = {},
	mouseDownElem = false;


window.onload = function () {
	newElemDefaultVals["transform"] = transformValTypes
	for (group in propGroups) {
		var groupElem = document.createElement("div");
		groupElem.innerText = group;
		groupElem.id = "group_" + group;
		groupElem.className = "groups";
		document.getElementById("menu").appendChild(groupElem);


		var blockGroupElem = document.createElement("div");
		blockGroupElem.id = "blockGroup_" + group;
		blockGroupElem.className = "blockGroup";
		document.getElementById("menu").appendChild(blockGroupElem);


		groupElem.addEventListener("click", function () {
			var id = "blockGroup_" + this.id.split("group_")[1];
			document.getElementById(id).classList.toggle("blockGroup-open");
		});

		var propertiesArr = propGroups[group];
		var len = propertiesArr.length;
		if (len > 0) {
			for (var i = 0; i < len; i++) {
				property = propertiesArr[i];
				propElem = createElemInsideProperty(property, blockGroupElem);

				//break line after property subgroup
				var brElem = document.createElement("br");
				propElem.appendChild(brElem);

				createElemValType(property, propElem);
			}
		} else {
			property = group;
			propElem = blockGroupElem;
			createElemValType(property, propElem);
		}

	}

	//For transform

	for (fnType in transformValTypes) {
		var elemFnType = document.createElement("div");
		var fnList = transformValTypes[fnType];
		elemFnType.innerText = fnType;
		elemFnType.className = "fnType";
		document.getElementById("blockGroup_transform").appendChild(elemFnType);
		for (fn in fnList) {
			var elemFn = document.createElement("div");
			elemFn.className = "transformProp";
			elemFn.innerText = fn;
			elemFnType.appendChild(elemFn);

			var inputElem = document.createElement("input");
			inputElem.type = "text";
			inputElem.id = fnType + "_" + fn;
			inputElem.className = "transformFnInp";
			elemFn.appendChild(inputElem);

			var incDecElem = document.createElement("span");
			incDecElem.innerHTML = "&#8597;";
			incDecElem.className = "upDownArrow";
			incDecElem.id = "transformIncDec_" + fnType + "_" + fn;
			elemFn.appendChild(incDecElem);

			incDecElem.addEventListener("mousedown", function () {
				incDecTransformSelected = true;
				incDecTransformSelectedElem = this;
				incDecTransformSelectedY = mouseY;
			});

			inputElem.addEventListener("change", function () {
				addTranfromValToElem(this);
			});
		}

	}

	addLineTimeline();
}


function addLineTimeline() {
	timelineRow = document.getElementById("timelineTr");
	for (var i = 0; i < 1000; i += 1) {
		var e = document.createElement("td");
		//var iF = i.toFixed(1);
		e.id = "timeLine" + i;
		e.style.minWidth = "0.1%";
		e.style.height = "10px";
		e.style.whiteSpace = "nowrap";
		e.style.backgroundColor = "transparent";
		e.style.display = "inline-block";


		//console.log(iF);
		if (i % 10 == 0)
			e.innerText = i / 10;
		e.style.fontSize = "10px";
		e.style.textAlign = "center";
		timelineRow.appendChild(e);

	}

}



function addTranfromValToElem(elem) {

	var fnType = elem.id.split("_")[0];
	var fn = elem.id.split("_")[1];
	elemsAdded[selElemId.current]["transform"][fnType][fn] = elem.value;

	var transformFnTypeArr = document.getElementsByClassName("transformFnInp");
	var transformFnTypeArrLen = transformFnTypeArr.length;
	var str = "",
		fnType;

	for (var ind = 0; ind < transformFnTypeArrLen; ind++) {
		fnType = transformFnTypeArr[ind].id.split("_")[0];
		if (transformFnTypeArr[ind].value == "") {
			if (fnType === "rotate" || fnType === "skew")
				val = "0deg";
			else if (fnType === "translate")
				val = "0px";
			else
				val = "1";
		} else
			val = transformFnTypeArr[ind].value;

		str += transformFnTypeArr[ind].id.split("_")[1] + "(" + val + ") ";
	}

	//console.log(str);
	document.getElementById(selElemId.current).style["transform"] = str;

	//console.log(document.getElementById(selElemId.current));

}

function createElemValType(property, propElem) {
	var propValTypes = propertiesList[property];
	var lenPropValTypes = propValTypes.length;
	for (var ind = 0; ind < lenPropValTypes; ind++) {

		valType = propValTypes[ind];

		var vals = valTypeList[valType];
		if (vals) {
			createRadioAttachEvent(propValTypes[ind], property, propElem);

			var selElem = document.createElement("select");
			selElem.id = propValTypes[ind] + "_" + property;
			selElem.disabled = true;
			propElem.appendChild(selElem);
			var lenVals = vals.length;
			for (var indVal = 0; indVal < lenVals; indVal++) {
				var optionElem = document.createElement("option");
				optionElem.text = vals[indVal];
				optionElem.value = vals[indVal];
				selElem.appendChild(optionElem);
			}

			attachEventInpField(selElem, "change");


		} else {
			var type;
			switch (valType) {

				case "color":
					createInputElemAttachRadio("color", propValTypes[ind], property, propElem);
					type = "input";
					attachEventInpField(document.getElementById(propValTypes[ind] + "_" + property), type);
					break;
				case "measurement":
					createInputElemAttachRadio("text", propValTypes[ind], property, propElem);
					type = "change";
					attachEventInpField(document.getElementById(propValTypes[ind] + "_" + property), type);
					break;
				case "number":
					createInputElemAttachRadio("number", propValTypes[ind], property, propElem);
					type = "change";
					attachEventInpField(document.getElementById(propValTypes[ind] + "_" + property), type);
					break;
			}

		}

	}
}

function createRadioAttachEvent(propValType, property, propElem) {
	var radioElem = document.createElement("input");
	radioElem.type = "radio";
	radioElem.name = "radioName_" + property;
	radioElem.id = "radioId_" + propValType + "_" + property;
	propElem.appendChild(radioElem);

	radioElem.addEventListener("change", function () {
		var valId = this.id.split("radioId_")[1];
		var elem = document.getElementById(valId);

		var radioName = "radioName_" + this.id.split("_")[2];

		var radioArrSelected = document.getElementsByName(radioName);
		var lenRadioArrSelected = radioArrSelected.length;

		for (var ind = 0; ind < lenRadioArrSelected; ind++) {
			var id = radioArrSelected[ind].id.split("radioId_")[1];
			var elemFromRadio = document.getElementById(id);
			var type = id.split("_")[0];
			var prop = id.split("_")[1];
			if (elem.id === id) {
				elemFromRadio.disabled = false;
				elemsAdded[selElemId.current][prop]["type"] = type;
				elemsAdded[selElemId.current][prop]["val"] = elemFromRadio.value;
				document.getElementById(selElemId.current).style[dashToCamelCase(prop)] = elemFromRadio.value;
				console.log(elemsAdded);
			} else
				elemFromRadio.disabled = true;
		}
		//document.getElementById("incDecElem_"+this.id.split("_")[2]).style.display="inline";

	});
}

function createInputElemAttachRadio(elemType, propValType, property, propElem) {
	createRadioAttachEvent(propValType, property, propElem);
	var elem = document.createElement("input");
	elem.type = elemType;
	elem.id = propValType + "_" + property;
	if (propValType === "measurement")
		elem.className = "inpMeasurement"
	elem.disabled = true;
	propElem.appendChild(elem);

	createIncDecBar(elem);
}

function createIncDecBar(elem) {
	if (elem.id.search("color")) {
		var incDecElem = document.createElement("span");
		incDecElem.id = "incDecElem_" + elem.id;
		incDecElem.innerHTML = "&#8597;";
		incDecElem.className = "upDownArrow";
		elem.outerHTML += incDecElem.outerHTML;

		var e = document.getElementById(incDecElem.id);
		e.addEventListener("mousedown", function () {
			incDecSelected = true;
			incDecSelectedElem = this;
			incDecSelectedY = mouseY;
		});
	}
}

document.addEventListener("mousemove", function (event) {
	mouseX = document.all ? window.event.clientX : event.pageX;
	mouseY = document.all ? window.event.clientY : event.pageY;

	if (incDecSelected) {
		var positive = incDecSelectedY - mouseY;
		var id = incDecSelectedElem.id.split("incDecElem_")[1];
		var elem = document.getElementById(id);
		var elemVal = parseFloat(elem.value.split(/px|deg/)[0]);
		//console.log(elem.id.split("incDecElem_")[0]);
		if (!document.getElementById(elem.id.split("incDecElem_")[0]).disabled) {
			if (positive > 0)
				elemVal += 1
			else if (positive < 0)
				elemVal -= 1;
			elem.value = elemVal + "px";

			addValToElem(elem);
		}
	} else if (incDecTransformSelected) {
		var positive = incDecTransformSelectedY - mouseY;
		var transformId = incDecTransformSelectedElem.id.split("_")[1];
		var transformInpId = incDecTransformSelectedElem.id.split("transformIncDec_")[1];
		console.log(transformInpId);
		var transformInpElem = document.getElementById(transformInpId);
		console.log(transformInpElem);
		var transformInpElemVal = parseFloat(transformInpElem.value.split(/px|deg/)[0]);

		if (positive > 0)
			transformInpElemVal += 1
		else if (positive < 0)
			transformInpElemVal -= 1;

		var mesType;

		if (transformId === "rotate" || transformId === "skew")
			mesType = "deg";
		else if (transformId === "translate")
			mesType = "px";
		else
			mesType = "";

		transformInpElem.value = transformInpElemVal + mesType;
		addTranfromValToElem(transformInpElem);

	} else if (mouseDownElem) {

		document.getElementById("translate_translateX").value = (mouseX - x_elem) + "px";
		addTranfromValToElem(document.getElementById("translate_translateX"));
		document.getElementById("translate_translateY").value = (mouseY - y_elem) + "px";
		addTranfromValToElem(document.getElementById("translate_translateY"));

	}

});


document.addEventListener("mouseup", function () {
	if (incDecSelected) {
		incDecSelectedElem = null;
		incDecSelected = false;
	}
	if (incDecTransformSelected) {
		incDecTransformSelectedElem = null;
		incDecTransformSelected = false;
	}
	if (mouseDownElem)
		mouseDownElem = false;

})



function createElemInsideProperty(property, blockGroupElem) {
	var propElem = document.createElement("div");
	propElem.innerText = property;
	propElem.id = "prop_" + property;
	propElem.className = "properties";
	blockGroupElem.appendChild(propElem);
	return propElem;
}

function attachEventInpField(elem, type) {
	elem.addEventListener(type, function () {
		addValToElem(this);
	});
}


function addValToElem(elem) {
	var prop = elem.id.split("_")[1];
	var propStyle = dashToCamelCase(prop);
	document.getElementById(selElemId.current).style[propStyle] = elem.value;
	elemsAdded[selElemId.current][prop]["val"] = elem.value;
}



document.getElementById("btn-addElem").addEventListener("click", function () {

	addNewElem();
	var elementId = selElemId.current;
	if (!keyframeElems[elementId])
		keyframeElems[elementId] = {};

	var val = 0;
	addKeyFrameF(val);
	toggleTimeline();

	placePropValInp(genSubframeElems, selElemId.current, parseFloat(document.getElementById("timeline").value) * 10);

});

function addNewElem() {
	var elem = document.createElement("div");
	elem.id = "elem" + elemInd;
	elem.style.position = "absolute";
	elem.style.cursor = "pointer";
	elem.style.borderStyle = "solid";
	elem.innerText = "selected";

	if (Object.keys(elemsAdded).length === 0) {
		elemsAdded[elem.id] = {};
		selElemId = {
			current: elem.id,
			previous: null
		};
	} else {
		deselectElemSetSelected(elem);
	}


	elem.addEventListener("mousedown", function () {

		deselectElemSetSelected(elem);
		this.innerText = "selected";

		x_elem = mouseX - parseFloat(document.getElementById("translate_translateX").value.split("px")[0]);
		y_elem = mouseY - parseFloat(document.getElementById("translate_translateY").value.split("px")[0]);

		mouseDownElem = true;


		toggleTimeline();
		placePropValInp(genSubframeElems, selElemId.current, parseFloat(document.getElementById("timeline").value) * 10);

	});

	elemsAdded[selElemId.current] = JSON.parse(JSON.stringify(newElemDefaultVals));
	console.log(elemsAdded);
	addZeroVal();
	var styleProp;
	for (prop in newElemDefaultVals) {
		styleProp = dashToCamelCase(prop);
		var v = elem.style[styleProp] = newElemDefaultVals[prop].val;
		var id = newElemDefaultVals[prop].type + "_" + prop;
		var e = document.getElementById(id);
		if (e) {
			e.value = v;
			e.disabled = false;
			var radioElem = document.getElementById("radioId_" + id);
			radioElem.checked = true;
			//document.getElementById("incDecElem_"+id).style.display="inline";
		}
	}
	document.getElementById("playground").appendChild(elem);

	elemInd += 1;

	//putting zero values in transform
	addZeroValTranform();
}


function deselectElemSetSelected(elem) {
	selElemId = {
		previous: selElemId.current,
		current: elem.id
	};
	if (selElemId.previous)
		document.getElementById(selElemId.previous).innerText = "not selected";
}

function toggleTimeline() {
	for (var ind = 0; ind < 1000; ind++) {
		if (keyframeElems[selElemId.current][ind])
			document.getElementById("timeLine" + ind).style.backgroundColor = "yellow";
		else
			document.getElementById("timeLine" + ind).style.backgroundColor = "transparent";
	}

}

function addZeroVal() {
	var inpArr = document.getElementsByClassName("inpMeasurement");
	var inpArrLen = inpArr.length;
	for (var inp = 0; inp < inpArrLen; inp++)
		inpArr[inp].value = "0px";
}

function addZeroValTranform() {
	var transformFnTypeArr = document.getElementsByClassName("transformFnInp");
	var transformFnTypeArrLen = transformFnTypeArr.length;
	var str = "",
		fnType;

	for (var ind = 0; ind < transformFnTypeArrLen; ind++) {
		fnType = transformFnTypeArr[ind].id.split("_")[0];
		if (fnType === "rotate" || fnType === "skew")
			val = "0deg";
		else if (fnType === "translate")
			val = "0px";
		else
			val = "1";

		transformFnTypeArr[ind].value = val;
	}
}

function dashToCamelCase(prop) {
	while (prop.search("-") !== -1) {
		var char = prop[prop.search("-") + 1];
		prop = prop.replace("-" + char, char.toUpperCase());
	}
	return prop;
}

function camelToDashCase(str) {
	return str.replace(/([A-Z])/g, function ($1) {
		return "-" + $1.toLowerCase();
	});
}


document.getElementById("addKeyframe").addEventListener("click", function () {

	var val = parseFloat(document.getElementById("timeline").value) * 10;
	addKeyFrameF(val);

	console.log(keyframeElems);
	genIntermediats(keyframeElems[selElemId.current]);
});


//Stores element properties values for a particular frame
function addKeyFrameF(val) {

	if (selElemId.current) {

		document.getElementById("timeLine" + val).style.backgroundColor = "yellow";

		elementId = selElemId.current;
		if (!keyframeElems[elementId][val])
			keyframeElems[elementId][val] = {};
		console.log(keyframeElems, val);

		keyframeElems[elementId][val] = JSON.parse(JSON.stringify(elemsAdded[selElemId.current]));
	}
}


//Generate sub frames
function genIntermediats(keyframeElemsVal) {

	console.log(keyframeElemsVal);
	var sI = 0,
		ind;
	for (var i = sI + 1; i < 1000; i += 1) {
		if (keyframeElemsVal[i]) {
			eI = i;
			console.log(sI, eI);

			genbetTwoIntermediates(sI, eI);
			sI = eI;
		}
		//				eI = ind - 1;

	}
}

//generate sub frames between two consecutive intermediates
function genbetTwoIntermediates(sI, eI) {
	var val = parseInt(document.getElementById("timeline").value) * 10;
	var elemId = selElemId.current;

	var noSteps = eI - sI;
	for (var i = sI; i <= eI; i += 1) {
		if (!genSubframeElems[elemId])
			genSubframeElems[elemId] = [];
		if (!genSubframeElems[elemId][i])
			genSubframeElems[elemId][i] = {};

		var keyframeData = keyframeElems[elemId];

		for (var key in keyframeData[sI]) {
			if (!genSubframeElems[elemId][i][key])
				genSubframeElems[elemId][i][key] = {};


			var suffix = "";
			var type = keyframeData[sI][key]["type"];
			genSubframeElems[elemId][i][key]["type"] = type;


			if (key === "transform") {
				for (fnType in keyframeData[sI][key]) {
					if (!genSubframeElems[elemId][i][key][fnType])
						genSubframeElems[elemId][i][key][fnType] = {};
					var mesType;
					if (fnType === "rotate" || fnType === "skew")
						mesType = "deg";
					else if (fnType === "translate")
						mesType = "px";
					else
						mesType = "";
					for (fn in keyframeData[sI][key][fnType]) {
						if (!genSubframeElems[elemId][i][key][fnType][fn])
							genSubframeElems[elemId][i][key][fnType][fn] = {};

						var sVal = parseFloat(keyframeData[sI][key][fnType][fn].split(/px|deg/)[0]);

						var eVal = parseFloat(keyframeData[eI][key][fnType][fn].split(/px|deg/)[0]);

						genSubframeElems[elemId][i][key][fnType][fn] = (sVal + ((eVal - sVal) / noSteps) * (i - sI)) + mesType;
					}
				}
			} else {
				if (type === "measurement" || type === "number") {

					var keyStartVal = parseFloat(keyframeData[sI][key]["val"].split("px")[0]);
					var keyEndVal = parseFloat(keyframeData[eI][key]["val"].split("px")[0]);

					genSubframeElems[elemId][i][key]["type"] = keyframeData[sI][key]["type"];
					if (type === "measurement")
						suffix = "px";

					genSubframeElems[elemId][i][key]["val"] = (keyStartVal + ((keyEndVal - keyStartVal) / noSteps) * (i - sI)) + suffix;


				} else if (type == "color") {
					var keyStartVal = keyframeData[sI][key]["val"].split("#")[1];
					var keyEndVal = keyframeData[eI][key]["val"].split("#")[1];

					var r0 = parseInt(keyStartVal.substring(0, 2), 16);
					var g0 = parseInt(keyStartVal.substring(2, 4), 16);
					var b0 = parseInt(keyStartVal.substring(4, 6), 16);

					var r1 = parseInt(keyEndVal.substring(0, 2), 16);
					var g1 = parseInt(keyEndVal.substring(2, 4), 16);
					var b1 = parseInt(keyEndVal.substring(4, 6), 16);

					var rI = intermediateCols(r0, r1, noSteps, i, sI);
					var gI = intermediateCols(g0, g1, noSteps, i, sI);
					var bI = intermediateCols(b0, b1, noSteps, i, sI);

					var newCol = "#" + rI + gI + bI;

					genSubframeElems[elemId][i][key]["val"] = newCol;
				}
			}
			//console.log(genSubframeElems);
		}
	}
}


document.getElementById("removeKeyframe").addEventListener("click", function () {
	var val = parseFloat(document.getElementById("timeline").value) * 10;
	document.getElementById("timeLine" + val).style.backgroundColor = "transparent";
	keyframeElems[selElemId.current][val] = undefined;
	genIntermediats(keyframeElems[selElemId.current]);
});


function intermediateCols(c0, c1, noSteps, i, sI) {
	var str = (parseInt((c0 + ((c1 - c0) / noSteps) * (i - sI)))).toString(16);
	if (str.length == 1)
		return "0" + str;
	else
		return str;
}


//Triggers when timeline bar moves
document.getElementById("timeline").addEventListener("input", function () {

	var val = this.value * 10;
	document.getElementById("currentTime").innerText = val / 10 + " sec";
	var data;

	for (elemKey in genSubframeElems) {
		for (prop in genSubframeElems[elemKey][val]) {

			if (prop == "transform") {
				var str = "";
				var tmpObj = genSubframeElems[elemKey][val][prop];
				for (fnType in tmpObj) {
					for (fn in tmpObj[fnType])
						str += fn + "(" + tmpObj[fnType][fn] + ") ";
				}
				data = str;
			} else {
				data = genSubframeElems[elemKey][val][prop]["val"];
			}

			document.getElementById(elemKey).style[dashToCamelCase(prop)] = data;
		}
	}

	placePropValInp(genSubframeElems, selElemId.current, val);
});


function placePropValInp(genSubframeElems, elemId, val) {
	for (prop in genSubframeElems[elemId][val]) {

		if (prop == "transform") {
			for (fnType in genSubframeElems[elemId][val][prop]) {
				for (fn in genSubframeElems[elemId][val][prop][fnType])
					document.getElementById(fnType + "_" + fn).value = genSubframeElems[elemId][val][prop][fnType][fn];
			}

		} else {
			//console.log(genSubframeElems[elemId][val][prop]["type"] + "_" + prop);
			document.getElementById(genSubframeElems[elemId][val][prop]["type"] + "_" + prop).value = genSubframeElems[elemId][val][prop]["val"];
		}

	}
}


document.getElementById("convertToCSS").addEventListener("click", function () {
	document.getElementById("genCss").innerText = generateCSS();
});


function generateCSS() {

	var initialIndVal = {};
	var dupValCountB = {};
	var str = "";
	var ind;

	for (elemId in keyframeElems) {
		str += "@keyframes " + elemId + "_animation{\n";
		for (ind in keyframeElems[elemId]) {
			if (keyframeElems[elemId][ind]) {
				for (prop in keyframeElems[elemId][ind]) {
					if (prop != "transform") {
						if (ind == 0) {
							initialIndVal[prop] = keyframeElems[elemId][ind][prop]["val"];
						} else {
							if (initialIndVal[prop] === keyframeElems[elemId][ind][prop]["val"])
								dupValCountB[prop] = true;
							else
								dupValCountB[prop] = false;
						}
					}
				}
			}
		}
		var totalTime = ind / 10;
		var indTime;
		var per;
		for (ind in keyframeElems[elemId]) {
			if (keyframeElems[elemId][ind]) {
				indTime = ind / 10;
				per = ((indTime / totalTime) * 100).toFixed(0);
				str += per + "%{\n";
				for (prop in keyframeElems[elemId][ind]) {
					if (!dupValCountB[prop] && prop != "transform") {
						console.log(prop);
						str += prop + ":" + keyframeElems[elemId][ind][prop]["val"] + ";\n";
					}
				}

				var transStr = "";
				for (fnType in keyframeElems[elemId][ind]["transform"])
					for (fn in keyframeElems[elemId][ind]["transform"][fnType])
						transStr += fn + "(" + keyframeElems[elemId][ind]["transform"][fnType][fn] + ") ";

				str += "transform:" + transStr + ";\n";
				str += "}\n";
			}
		}
		str += "}\n";

		str += "." + elemId + "{\n";
		str += "position:absolute;\n";
		str += "cursor:pointer;\n";
		str += "border-style:solid;\n";
		str += "background-color:black;\n";
		str += "width:100px;\n";
		str += "height:100px;\n";
		str += "animation-name:" + elemId + "_animation;\n";
		str += "animation-duration:" + ind / 10 + "s;\n";
		str += "animation-iteration-count:1;\n";
		str += "animation-timing-function:linear;\n";
		str += "}\n";
	}

	console.log(str);
	return str;
}
