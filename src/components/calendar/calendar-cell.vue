<template>
    <div class='calendar-cell-outer'>
        <div class="calendar-cell"   @click.stop="handl_one_day(cell,$event)"  :data-date="cell.date" :class="{
            'calendar-cell-between': cell.isBetween
        }">
        
            <div class="cell-month" v-if="viewType=='month'" >
                <p class="right-date">{{rightDate}}</p>
                <div v-for="(item,index) in cell.list" :key="index"  draggable="true"  
                :data-pos="item.hashPos"
                :data-date="item.date"
                class="lesson-slip">
                    <div  class="lesson-slip-old lesson-slip_inner"  :class="{
                            'lesson-slip-new': item.isNew,
                        }" >       
                        <div class="info">
                            {{item.lessonSubject}} {{item.lessonTime}}
                        
                        </div>
                        <div class="action" v-if="item.isNew">
                            <button  @click.stop="handlSingleEdit(item,index,cell)">
                                <i class="el-icon-edit" ></i>
                            </button>
                            <button  @click.stop="handlSingleRemove(item,index,cell)">
                                <i class="el-icon-delete"></i>
                            </button>
                        </div>
                    </div>
                </div>
                

            </div>
            <div class="cell-week" :class="cellClass" v-if="viewType=='week'">
                
            </div>
            <div class="cell-week" :class="cellClass" v-if="viewType=='day'">
                
            </div>
        
        </div>
    </div>
    
</template>

<script>
import Moment from "moment";
export default {
  name: "calendarCell",
  componentName: "calendarCell",
  data() {
    return {};
  },
  props: {
    cell: [Object],
    viewType: [String]
  },
  computed: {
    rightDate() {
      return Moment(this.cell.date).format("D");
    },

    cellClass() {
      return {
        "test-and-regular":
          this.cell.testLessonNum && this.cell.regularLessonNum,
        "test-only": this.cell.testLessonNum && !this.cell.regularLessonNum,
        "regular-only": !this.cell.testLessonNum && this.cell.regularLessonNum
      };
    }
  },
  methods: {
    showMore(date, lessonType) {
      this.$dispatch("calendarHome", "showMore", {
        date,
        lessonType
      });
    },
    handlSingleEdit(item,index,cell){
        if(!cell.isBetween){
            return;
        }
        this.$dispatch("calendarHome", "singleEdit",{item,index});
    },
    handlSingleRemove(item,index,cell){
        if(!cell.isBetween){
            return;
        }
        this.$dispatch("calendarHome", "singleRemove", {item,index});
    },
    handl_one_day(item,event){
        if(!item.isBetween){
            return;
        }
        let have=['right-date','calendar-cell-between'].some((item)=>{
           return event.target.className.search(item)!=-1;
        });
        if(have){
            this.$dispatch("calendarHome", "singleDay", item);
        }
          
    }

  }
};
</script>
