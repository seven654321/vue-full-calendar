<template>
    <div class="calendar-col">
        <div class="cell-wrapper">
            <calendar-cell v-for="(cell, index) in cells" :cell="cell" :key="index" :viewType="viewType"></calendar-cell>
        </div>
    </div>
</template>

<script>


    import calendarCell from './calendar-cell.vue';
    export default {
        name: 'calendarCol',
        components: { calendarCell },
        data() {
            return {
            };
        },
        props: {
            cells: [Array],
            viewType: [String]
        }
    };

</script>
