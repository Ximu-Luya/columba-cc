<script setup lang='ts'>
import { h, ref, onMounted } from 'vue'
import { NDataTable, type DataTableColumns } from 'naive-ui'
import CardBox from '@src/components/CardBox.vue'
import ProductCell from './ProductCell.vue'
import PriceCell from './PriceCell.vue'

import testData from '@/data/test_data.json'
const productList = ref<ProductData[]>([])

type ProductData = {
  /**
   * 货物名称
   */
  name: string
  /**
   * 原产地
   */
  origin: string
  /**
   * 采购价
   */
  purchasePrice: CityPrice | null
  /**
   * 各城市报价
   */
  cityQuotation: CityPrice[]
}

const createColumns = (): DataTableColumns<ProductData> => [
  {
    title: '货物名称',
    key: 'name',
    render: (productData: ProductData) => {
      return h(
        ProductCell,
        {
          name: productData.name,
          origin: productData.origin
        }
      )
    }
  },
  {
    title: '采购价',
    key: 'purchasePrice',
    render: (productData: ProductData) => {
      return h(
        PriceCell,
        {
          data: productData.purchasePrice!
        }
      )
    }
  }
]
const columns = ref([
  {
    title: '货物名称',
    key: 'name',
    render: (productData: ProductData) => {
      return h(
        ProductCell,
        {
          name: productData.name,
          origin: productData.origin
        }
      )
    }
  },
  {
    title: '采购价',
    key: 'purchasePrice',
    render: (productData: ProductData) => {
      return h(
        PriceCell,
        {
          data: productData.purchasePrice!
        }
      )
    }
  }
])

onMounted(() => {
  const tableData: ProductData[] = []
  testData.forEach(priceItem => {
    const product = tableData.find(product => product.name === priceItem.name)
    if(product) {
      if(priceItem.type == 'buy') {
        product.purchasePrice = {
          cityName: priceItem.city,
          price: priceItem.price,
          pricePercent: priceItem.percent,
          trend: priceItem.trend as PriceTrend
        }
      } else {
        product.cityQuotation.push({
          cityName: priceItem.targetCity,
          price: priceItem.price,
          pricePercent: priceItem.percent,
          trend: priceItem.trend as PriceTrend
        })
      }
    } else {
      let product: ProductData = {
        name: priceItem.name,
        origin: priceItem.city,
        purchasePrice: null,
        cityQuotation: []
      }
      if(priceItem.type == 'buy') {
        product.purchasePrice = {
          cityName: priceItem.city,
          price: priceItem.price,
          pricePercent: priceItem.percent,
          trend: priceItem.trend as PriceTrend
        }
      } else {
        product.cityQuotation = [{
          cityName: priceItem.targetCity,
          price: priceItem.price,
          pricePercent: priceItem.percent,
          trend: priceItem.trend as PriceTrend
        }]
      }
      tableData.push(product)
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
        :scroll-x="180"
      />
    </CardBox>
  </div>
</template>

<style>
  
</style>