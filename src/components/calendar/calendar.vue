<template>
    <div class="hl-calendar" :class="{
            'hl-calendar-month': viewType == 'month',
            'hl-calendar-week': viewType == 'week',
            'hl-calendar-day': viewType == 'day',
          }">
        <div class="hl-calendar-tools-wrapper">
            <div class="calendar-tools">
                <div class="calendar-tools-left">
    
                    <button :class="dayType == 'prev'? activeClass : ''" @click="handlePrev">&lt;</button>
                    <button :class="dayType == 'next'? activeClass : ''" @click="handleNext">&gt;</button>
        
                    <button :class="dayType == 'today'? activeClass : ''" @click="handleToday">今天</button>
            
                </div>
                <div class="calendar-tools-center">
                    <h2 class="current-date">{{currentDuration}}</h2>
                </div>
                <div class="calendar-tools-right">
     
                        <button v-if="showType.indexOf('day')!==-1"  @click="handleViewChange('day')" :class="viewType == 'day'? activeClass : ''">日</button>
                        <button v-if="showType.indexOf('week')!==-1" @click="handleViewChange('week')" :class="viewType == 'week' ? activeClass : ''">周</button>
                        <button v-if="showType.indexOf('month')!==-1"  @click="handleViewChange('month')" :class="viewType == 'month' ? activeClass : ''">月</button>
             
                </div>

            </div>
        </div>
        <div class="hl-calendar-body-wrapper" @scroll="bodyScroll">
            <div class="hl-calendar-header-wrapper">
                <calendar-header :view-type="viewType" :currentDate="currentDate"></calendar-header>
            </div>
            <div class="hl-calendar-content-wrapper">
                <div class="hl-calendar-side-wrapper" v-if="isSideShow">
                    <calendar-side></calendar-side>
                </div>
                <div class="hl-calendar-cols-wrapper" :class="{
                    'hl-calendar-cols-wrapper-month': viewType == 'month',
                    'hl-calendar-cols-wrapper-week': viewType == 'week',
                    'hl-calendar-cols-wrapper-day': viewType == 'day',
                  }">
                    <calendar-col v-for="(row, index) in cols" :cells="row" :key="index" :viewType="viewType"></calendar-col>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import calendarHeader from './calendar-header.vue';
    import calendarSide from './calendar-side.vue';
    import calendarCol from './calendar-col.vue';
    let currentMoment = new moment();
    import drag from './drag.js';

    export default {
        componentName:'calendarHome',
        mixins:[drag],
        data() {
            return {
                $bodyWrapper: [Object],
                $headerWrapper: [Object],
                $contentWrapper: [Object],
                activeClass: 'button-active',
                dayType:'today'
            };
        },
        props: {
            viewColl: {
                type:[Object],
                default() {
                    return {
                        type:'month',
                        date: currentMoment.format('YYYY-MM-DD'),
                        
                    };
                },
            },
            showType:{
                type:[Array],
                default(){
                    return ['month','day','week']
                }
            },
            events: [Object, Array]
        },
        computed: {
            currentDateUnit() {
                return this.viewType + 's';
            },
            viewType(){
                return this.viewColl.type;
            },
            currentDate(){
                return this.viewColl.date;
            },
            currentDuration() {
                let cd;
                let currentDateMoment = new moment(this.currentDate);
                switch (this.viewType) {
                    case 'month':
                        cd = currentDateMoment.format('YYYY年MM月');
                        break;
                    case 'week':
                        cd = currentDateMoment.startOf('week').format('YYYY年MM月DD');
                        cd += currentDateMoment.endOf('week').format(' - DD日');
                        break;
                    case 'day':
                        cd = currentDateMoment.format('YYYY年MM月DD日');
                        break;
                }
                return cd;
            },
            isSideShow() {
                return ['week', 'day'].indexOf(this.viewType)!=-1;
            },
            cols() {
                //其实是行
                let cols = [];
                switch (this.viewType) {
                    case 'month':
                        cols = this.resolveMonthCols(this.events);
                        break;
                    case 'week':
                        cols = this.resolveWeekCols(this.events);
                        break;
                    case 'day':
                        cols = this.resolveDayCols(this.events);
                        break;
                }
                return cols;
            }
        },
        updated() {
            this.$nextTick(() => {
                if (this.viewType != 'month') {
                    this.$bodyWrapper.scrollTop = 1122;
                }
            });
        },
        mounted() {
            this.$bodyWrapper = this.$el.querySelector('.hl-calendar-body-wrapper');
            this.$headerWrapper = this.$el.querySelector('.hl-calendar-header-wrapper');
            this.$contentWrapper = this.$el.querySelector('.hl-calendar-content-wrapper');
            this.handleResize();
            window.addEventListener('resize', this.handleResize, false);
            this.$nextTick(() => {
                if (this.viewType != 'month') {
                    this.$bodyWrapper.scrollTop = 1122;
                }
            });
            this.init_drag(this.viewColl,this.handleDragDrop.bind(this));
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize, false);
        },
        methods: {
            bodyScroll() {
                // this.$headerWrapper.style.top = this.$bodyWrapper.scrollTop + 'px';
            },
            handleDragDrop(param){
                this.$emit('dragDrop',param);
            },
            handleResize() {
                if (this.viewType == 'month') {
                    this.$bodyWrapper.style.height = this.$headerWrapper.offsetHeight + this.$contentWrapper.offsetHeight + 1 + 'px';
                } else {
                    this.$bodyWrapper.style.height = this.$el.offsetWidth / 2 + 'px';
                }
            },
            handlePrev() {
                this.dayType='prev';
                this.viewColl.date = moment(this.currentDate).subtract(1, this.currentDateUnit).format('YYYY-MM-DD');
                this.$emit('prev',this.currentDate);
            },
            handleNext() {
                this.dayType='next';
                this.viewColl.date  = moment(this.currentDate).add(1, this.currentDateUnit).format('YYYY-MM-DD');
                this.$emit('next',this.currentDate);
            },
            handleToday() {
                this.dayType='today';        
                this.viewColl.date  = moment().format('YYYY-MM-DD');
                this.$emit('today',this.currentDate);
            },
            handleViewChange(type) {
                this.viewColl.type= type;
                this.$emit('viewChange', type);
                this.$nextTick(() => {
                    this.handleResize();
                });
            },
            resolveDayCols(events) {
                let currentDateMoment = new moment(this.currentDate);
                let cells = [];
                let cols = [];
                currentDateMoment.startOf('day').subtract(1, 'h');

                for (let i = 1; i <= 24; i++) {
                    currentDateMoment.add(1, 'h');
                    let date = currentDateMoment.format('YYYY/MM/DD H');

                    let event = events[date];
                    let cell = {
                        date: currentDateMoment.format('YYYY/MM/DD HH:00:00')
                    };
                    Object.assign(cell, event);
                    cells.push(cell);

                }
                cols.push(cells);
                console.log('resolveDayCols=======================', cols);
                return cols;
            },
            resolveWeekCols(events) {
                let currentDateMoment = new moment(this.currentDate);
                let cells = [];
                let cols = [];
                currentDateMoment.startOf('week').subtract(1, 'h');

                for (let i = 1; i <= 24 * 7; i++) {
                    currentDateMoment.add(1, 'h');
                    let date = currentDateMoment.format('YYYY/MM/DD H');

                    let event = events[date];
                    let cell = {
                        date: currentDateMoment.format('YYYY/MM/DD HH:00:00')
                    };
                    Object.assign(cell, event);
                    cells.push(cell);

                    if (i % 24 == 0) {
                        cols.push(Array.from(cells));
                        cells = [];
                    }
                }
                console.log('resolveWeekCols=======================', cols);
                return cols;
            },
            resolveMonthCols(events) {
                let currentDateMoment = new moment(this.currentDate);
                let cells = [];
                let cols = [];
                currentDateMoment.endOf('month');
                let endDate = currentDateMoment.add(1, 'd').format('YYYY-MM-DD');
                currentDateMoment.subtract(1, 'd').startOf('month');
                let startWeek = currentDateMoment.toDate().getDay();
                let startDate = currentDateMoment.subtract(1, 'd').format('YYYY-MM-DD');
                currentDateMoment.subtract((startWeek + 6) % 7, 'days');

                for (let i = 1; i < 43; i++) {
                    currentDateMoment.add(1, 'days');
                    let date = currentDateMoment.format('YYYY/MM/DD');

                    let event = events[date];
                    let cell = {
                        date: currentDateMoment.format('YYYY-MM-DD'),
                        isBetween: currentDateMoment.isBetween(startDate, endDate)
                    };
                    Object.assign(cell, event);
                    cells.push(cell);

                    if (i % 7 == 0) {
                        cols.push(Array.from(cells));
                        cells = [];
                    }
                }
                return cols;
            }
        },
        components: {
            calendarHeader,
            calendarSide,
            calendarCol
        }
    };

</script>
