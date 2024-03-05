<script setup lang='ts'>
import { h, ref, onMounted } from 'vue'
import { NDataTable, type DataTableColumns } from 'naive-ui'
import ProductCell from './ProductCell.vue'

import testData from '@/data/test_data.json'
const productList = ref<RowData[]>([])

type CityPrice = {
  cityName: string
  price: number
  priceChange: number
  trend: 'up' | 'down'
}

type RowData = {
  name: string
  origin: string
  xiugeli: CityPrice
}

const createColumns = (): DataTableColumns<RowData> => [
  {
    title: '货物名称',
    key: 'name',
    render: (rowData: RowData) => {
      return h(
        ProductCell,
        {
          name: rowData.name,
          origin: rowData.origin
        }
      )
    }
  }
]
const columns = ref(createColumns())

onMounted(() => {
  const tableData: RowData[] = []
  testData.forEach(item => {
    const product = tableData.find(product => product.name === item.name)
    if(product) {
      product.xiugeli = {
        cityName: item.city,
        price: item.price,
        priceChange: item.percent,
        trend: 'down'
      }
    } else {
      tableData.push({
        name: item.name,
        origin: item.city,
        xiugeli: {
          cityName: item.city,
          price: item.price,
          priceChange: item.percent,
          trend: 'down'
        }
      })
    }
  })

  productList.value = tableData
})
</script>

<template>
  <div class="product-list-wrapper">
    <CardBox>
      <NDataTable
        :columns="columns"
        :data="productList"
        :scroll-x="1800"
      />
    </CardBox>
  </div>
</template>

<style>
  
</style>