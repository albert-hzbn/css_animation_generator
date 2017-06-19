var propGroups = {
	"background": ["background-color", "background-position", "background-size"],
	"border": ["border-color", "border-radius", "border-width"],
	"box-shadow": [],
	"color": [],
	"textNFont": ["font-size", "font-stretch", "font-weight", "letter-spacing", "line-height", "text-decoration", "text-shadow"],
	"margin": ["margin-top", "margin-right", "margin-bottom", "margin-left"],
	"opacity": [],
	"padding": ["padding-top", "padding-right", "padding-bottom", "padding-left"],
	"size": ["height", "width", "max-height", "max-width", "min-height", "min-width"],
	"transform":[],
	"z-index": []
};

var propertiesList={
	"background-color": ["color"],
	"background-position": ["global", "posKeyword", "measurement"],
	"background-size": ["global", "bgSizeList", "measurement"],
	"border-color": ["color"],
	"border-radius": ["measurement"],
	"border-width": ["measurement"],
	"box-shadow": ["global", "shadow"],
	"color": ["global", "colList", "color"],
	"font-size": ["global", "fontSizeList", "measurement"],
	"font-stretch": ["global", "fontStreachList"],
	"font-weight": ["global", "fontWeightList"],
	"height": ["global", "auto", "measurement"],
	"left": ["global", "auto", "measurement"],
	"letter-spacing": ["global", "normal", "measurement"],
	"line-height": ["global", "normal", "measurement"],
	"margin-top": ["global", "auto", "measurement"],
	"margin-right": ["global", "auto", "measurement"],
	"margin-bottom": ["global", "auto", "measurement"],
	"margin-left": ["global", "auto", "measurement"],
	"max-height": ["global", "minMaxList", "measurement"],
	"max-width": ["global", "minMaxList", "measurement"],
	"min-height": ["global", "minMaxList", "measurement"],
	"min-width": ["global", "minMaxList", "measurement"],
	"opacity": ["global", "number"],
	"padding-top": ["global", "measurement"],
	"padding-right": ["global", "measurement"],
	"padding-bottom": ["global", "measurement"],
	"padding-left": ["global", "measurement"],
	"left": ["global", "auto", "measurement"],
	"text-decoration": ["global", "none"],
	"text-shadow": ["global", "shadow"],
	"top": ["global", "auto", "measurement"],
	"width": ["global", "auto", "measurement"],
	"transform":[],
	"z-index": ["global", "number"]
};

var valTypeList = {
	"global": ["inherit", "initial", "unset"],
	"bgSizeList": ["cover", "contain"],
	"posKeyword": ["top", "right", "bottom", "left"],
	"colList": ["red", "blue", "green", "yellow", "black", "white"],
	"fontSizeList": ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"],
	"fontStreachList": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded"],
	"fontWeightList": ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
	"minMaxList": ["none", "max-content", "min-content", "fit-content", "fill-available"]
};

var transformValTypes = {
	"translate": {
		"translateX": "0px",
		"translateY": "0px",
		"translateZ": "0px",
		"perspective": "0px"
	},
	"scale": {
		"scaleX": "1",
		"scaleY": "1"
	},
	"rotate": {
		"rotateX": "0deg",
		"rotateY": "0deg",
		"rotateZ": "0deg"
	},
	"skew": {
		"skewX": "0deg",
		"skewY": "0deg"
	}
}

var newElemDefaultVals = {
	"background-color": {
		"type": "color",
		"val": "#000000"
	},
	"background-position": {
		"type": "global",
		"val": "inherit"
	},
	"background-size": {
		"type": "global",
		"val": "inherit"
	},
	"border-color": {
		"type": "color",
		"val": "#000000"
	},
	"border-radius": {
		"type": "measurement",
		"val": "0px",
	},
	"border-width": {
		"type": "measurement",
		"val": "0px",
	},
	"box-shadow": {
		"type": "global",
		"val": "inherit"
	},
	"color": {
		"type": "colList",
		"val": "red"
	},
	"font-size": {
		"type": "global",
		"val": "inherit"
	},
	"font-stretch": {
		"type": "global",
		"val": "inherit"
	},
	"font-weight": {
		"type": "global",
		"val": "inherit"
	},
	"height": {
		"type": "measurement",
		"val": "100px"
	},
	"letter-spacing": {
		"type": "global",
		"val": "inherit"
	},
	"line-height": {
		"type": "global",
		"val": "inherit"
	},
	"margin-top": {
		"type": "global",
		"val": "inherit"
	},
	"margin-right": {
		"type": "global",
		"val": "inherit"
	},
	"margin-bottom": {
		"type": "global",
		"val": "inherit"
	},
	"margin-left": {
		"type": "global",
		"val": "inherit"
	},
	"max-height": {
		"type": "global",
		"val": "inherit"
	},
	"max-width": {
		"type": "global",
		"val": "inherit"
	},
	"min-height": {
		"type": "global",
		"val": "inherit"
	},
	"min-width": {
		"type": "global",
		"val": "inherit"
	},
	"opacity": {
		"type": "global",
		"val": "inherit"
	},
	"padding-top": {
		"type": "global",
		"val": "inherit"
	},
	"padding-right": {
		"type": "global",
		"val": "inherit"
	},
	"padding-bottom": {
		"type": "global",
		"val": "inherit"
	},
	"padding-left": {
		"type": "global",
		"val": "inherit"
	},
	"text-decoration": {
		"type": "global",
		"val": "inherit"
	},
	"text-shadow": {
		"type": "global",
		"val": "inherit"
	},
	"width": {
		"type": "measurement",
		"val": "100px"
	},
	"z-index": {
		"type": "global",
		"val": "inherit"
	}
};
