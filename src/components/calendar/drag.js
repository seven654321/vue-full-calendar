function init_drag(data,handleDragDrop){
      data=data||{};
      /* 可拖动的目标元素会触发事件 */
      document.addEventListener("drag",function(event){
      }, false);
      document.addEventListener("dragstart",function(event){
          // 保存拖动元素的引用(ref.)
          data.drag_target = event.target;
          // 使其半透明
      }, false);
      document.addEventListener("dragend",function(event){
          // 重置透明度
      }, false);
      /* 放下目标节点时触发事件 */
      document.addEventListener("dragover",function(event){
          // 阻止默认动作
          event.preventDefault();
      }, false);
      document.addEventListener("dragenter",function(event){
          // 当可拖动的元素进入可放置的目标高亮目标节点
          if (event.target.className.search('calendar-cell-between')!=-1) {
              
          }
      },false);
      document.addEventListener("dragleave",function(event){
          // 当拖动元素离开可放置目标节点，重置其背景
          if ( event.target.className.search('calendar-cell-between')!=-1){
        
          }
      }, false);
      document.addEventListener("drop",function(event){
          // 阻止默认动作（如打开一些元素的链接）
        event.preventDefault();
          // 移动拖动的元素到所选择的放置目标节点
        const {pos,date}=data.drag_target.dataset;
        let pNode;
        if(pNode=parentClassHas(event.target)){
            const new_date=pNode.dataset.date;
            handleDragDrop({
                pos,
                date,
                new_date
            });
        }
      }, false);
}
function parentClassHas(target){

    while(target.parentNode!=null){
        let pNode=target;
        if((pNode.className||'').search('calendar-cell-between')!=-1){
            return pNode;
        }
        target=target.parentNode;
    }
    return null;
    
}
export default {
    methods:{
        init_drag,
    }
}