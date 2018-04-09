<template>
    <div class="calendar-side">
        <ul>
            <li class="slat-item" v-for="slat in timeSlats">{{ slat }}</li>
        </ul>

    </div>
</template>

<script>
    import Moment from 'moment';
    export default {
        name: 'calendarSide',
        data() {
            return {
                // columnData:Object.assign({},this.data)
            };
        },
        props: {
            timeSep: {
                type: [Number, String],
                default: 1
            }
        },
        computed: {
            timeSlats() {
                let self = this;
                let dayMonment = Moment().startOf('day');
                dayMonment.subtract(self.timeSep, 'hours');
                return Array.from({ length: 24 / self.timeSep | 0 }).map(() => {
                    return dayMonment.add(self.timeSep, 'hours').format('HH:mm');
                });
            }
        }
    };

</script>
