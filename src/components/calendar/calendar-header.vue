<template>
    <div class="calendar-header" :class="viewTypeClass">
        <div class='parent'>
            <div v-for="item in items"  :key='item' class='son'>
                <div style="border-right:1px solid #ddd">
                    {{item}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Moment from 'moment';
    let currentMoment = new Moment();
    let baseItems = [
        '周日',
        '周一',
        '周二',
        '周三',
        '周四',
        '周五',
        '周六',
        
    ];
    export default {
        name: 'calendarHeader',
        props: {
            viewType: {
                type: String,
                default: 'month'
            },
            currentDate: {
                type: String,
                default() {
                    return currentMoment.format('YYYY-MM-DD');
                }
            }
        },
        data() {
            return {
            };
        },
        computed: {
            viewTypeClass(){
                return 'calendar-header-' + this.viewType;
            },
            items() {
                let filterItems;
                let cloneMoment;
                switch (this.viewType) {
                    case 'month':
                        filterItems = baseItems;
                        console.log('Moment(this.currentDate)', Moment(this.currentDate).toDate());
                        break;
                    case 'week':

                        cloneMoment = Moment(this.currentDate).startOf('week').subtract('days', 1);
                        filterItems = baseItems.map((item) => {
                            return item + ' ' + cloneMoment.add('days', 1).format('MM月DD日');
                        });
                        filterItems.unshift(' ');
                        break;
                    case 'day':
                        filterItems = [baseItems[(Moment(this.currentDate).toDate().getDay())]];
                        filterItems.unshift(' ');
                        break;
                }
                return filterItems;
            }
        }
    };

</script>
