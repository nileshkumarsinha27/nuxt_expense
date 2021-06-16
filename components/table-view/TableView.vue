<template>
  <div class="table-container">
    <table class="rm-table">
      <thead>
        <tr>
          <TableHeader v-for="(value, key, index) in headers" :key="index" :header="key" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <TableData
            v-for="(value, key, index) in headers"
            :data="item[value]"
            :key="index"
            :headerKey="value"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import TableHeader from '~/components/table-view/table-header/TableHeader.vue';
import TableData from '~/components/table-view/table-data/TableData.vue';
export default Vue.extend({
  name: 'TableView',
  components: { TableHeader, TableData },
  props: {
    headers: {
      type: Object,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
});
</script>
<style lang="scss">
.table-container {
  margin: 32px 0;
  max-height: 40vh;
  height: 40vh;
  overflow-y: auto;
  .rm-table {
    border-spacing: 0 0.8rem;
    width: 75%;
    display: table;
    font-size: 13px;
    table-layout: fixed;
    margin: 0 auto;
    animation: opacityAnimation 0.8s ease;
    overflow: hidden;
    tr {
      display: table-row;
    }
    th {
      font-size: 13px;
      font-weight: bold;
      text-transform: uppercase;
      text-align: left;
      padding: 24px;
    }
    td {
      vertical-align: middle;
      text-align: left;
      font-size: 14px;
      padding: 0 24px;
      white-space: pre-wrap;
      word-break: break-word;
      text-transform: capitalize;
    }
    tbody {
      tr {
        padding: 10px 0;
        height: 45px;
        border-radius: 5px;
        &:nth-of-type(2n) {
          background: $blue;
          color: $white;
        }
      }
    }
    thead {
      position: sticky;
      top: 0;
      z-index: 1;
    }
  }
}
</style>
