// Standardize Sandbox HTML5 Tags
tags = new Array ("sandbox", "stage", "component", "sprite", "slider", "slide", "controls",  "background", "panel", "pane", "navrule", "social");

for (tag in tags){
	document.createElement(tags[tag]);
}