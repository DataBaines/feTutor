import SceneManager from "./SceneManager";

/*************************************************
 * A link between the Fe3Mesh component and the Scene manager
 *
 *************************************************/
const ThreeEntryPoint = (
  containerElement,
  addNodeRequest,
  selectNode,
  selectElement,
  addLogEntry,
  moveNode,
  modelProps
) => {
  const canvas = createCanvas(document, containerElement);
  const sceneManager = SceneManager(
    canvas,
    addNodeRequest,
    selectNode,
    selectElement,
    addLogEntry,
    moveNode,
    modelProps
  );

  bindEventListeners();

  render();

  function createCanvas(document, containerElement) {
    const canv = document.createElement("canvas");
    containerElement.appendChild(canv);
    return canv;
  }

  function bindEventListeners() {
    window.onresize = resizeCanvas;
    canvas.onmousedown = handleMouseDown;
    canvas.onmouseup = handleMouseUp;
    canvas.onmousemove = handleMouseMove;
    resizeCanvas();
  }

  function handleMouseDown(event: MouseEvent) {
    event.preventDefault();

    switch (event.buttons) {
      case 1: // left mouse down click, pass details to sceneManager
        sceneManager.onMouseDown(event.clientX, event.clientY);
        break;
    }
  }

  function handleMouseUp(event: MouseEvent) {
    event.preventDefault();

    switch (event.buttons) {
      case 0: // mouseup click, pass details to sceneManager
        sceneManager.onMouseUp(event.clientX, event.clientY);
        render();
        break;
    }
  }

  function handleMouseMove(event: MouseEvent) {
    event.preventDefault();
    sceneManager.onMouseMove(event.clientX, event.clientY);
    render();
  }

  function resizeCanvas() {
    // canvas.style.width = '100vw';
    // canvas.style.height= '100vh';
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    // canvas.width  = window.innerWidth;
    // canvas.height = window.innerHeight;
    // canvas.height = canvas.offsetHeight;
    sceneManager.onWindowResize();
    render();
  }

  function render() {
    //requestAnimationFrame(render); //Callback to continuously rerender at 60fps
    sceneManager.update();
    //console.log("3Entry.render.");
  }

  // function onPropsChange(modelProps){
  //   sceneManager.onPropChange(modelProps);
  // }

  function onMeshChange(modelProps) {
    sceneManager.onMeshChange(modelProps);
    render();
  }

  function onSelectedNodeChange(modelProps) {
    sceneManager.onSelectedNodeChange(modelProps);
    render();
  }

  function onSelectedElementChange(modelProps) {
    sceneManager.onSelectedElementChange(modelProps);
    render();
  }

  function onMoveNodesChange(modelProps) {
    sceneManager.onSelectedNodeChange(modelProps);
    render();
  }

  return {
    // onPropsChange,
    onMeshChange,
    onSelectedNodeChange,
    onSelectedElementChange,
    onMoveNodesChange,
  };
};

export default ThreeEntryPoint;
