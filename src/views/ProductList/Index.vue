<script setup lang='ts'>
import { h, ref, onMounted } from 'vue'
import { NDataTable, type DataTableColumns } from 'naive-ui'
import CardBox from '@src/components/CardBox.vue'
import ProductCell from './ProductCell.vue'
import PriceCell from './PriceCell.vue'

import testData from '@/data/test_data.json'
import CityQuotationCell from './CityQuotationCell.vue'
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
  cityQuotations: CityPrice[]
}

const columns = ref<DataTableColumns<ProductData>>([
  {
    title: '货物名称',
    key: 'name',
    width: 150,
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
  },
  {
    title: '各城市报价',
    key: 'cityQuotation',
    render: (productData: ProductData) => {
      return h(
        CityQuotationCell,
        {
          data: productData.cityQuotations
        }
      )
    }
  }
])

onMounted(() => {
  const tableData: ProductData[] = []
  testData.forEach(priceItem => {
    const product = tableData.find(product => product.name === priceItem.name)
    const priceData: CityPrice = {
      cityName: priceItem.type == 'buy' ? priceItem.city : priceItem.targetCity,
      price: priceItem.price,
      pricePercent: priceItem.percent,
      trend: priceItem.trend as PriceTrend,
      uploadedAt: priceItem.uploadedAt
    }
    
    if(product) {
      if(priceItem.type == 'buy') {
        /**
         * 1. 采购价已存在
         * 2. 新读取的数据上传时间早于已有数据
         * 以上两个条件满足时，不更新采购价
         */
        if(product.purchasePrice) {
          product.origin = [product.origin, priceItem.city].join(', ')
          // 新读取的数据上传时间早于已有数据，不对采购价进行更新
          if(new Date(priceItem.uploadedAt) < new Date(product.purchasePrice.uploadedAt)) return
        }

        product.purchasePrice = priceData
      } else {
        const targetCityQuotation = product.cityQuotations.find(cityQuotation => cityQuotation.cityName === priceItem.targetCity)
        /**
         * 1. 城市报价已存在
         * 2. 新读取的数据上传时间晚于已有数据
         * 以上两个条件满足时，更新城市报价
         */
        if(targetCityQuotation) {
          // 新读取的数据上传时间晚于已有数据
          if(new Date(priceItem.uploadedAt) > new Date(targetCityQuotation.uploadedAt)) {
            // 替换城市报价
            product.cityQuotations.splice(product.cityQuotations.indexOf(targetCityQuotation), 1, priceData)
          }
        } else {
          // 添加城市报价
          product.cityQuotations.push(priceData)
        }
      }
    } else {
      let product: ProductData = {
        name: priceItem.name,
        origin: priceItem.city,
        purchasePrice: null,
        cityQuotations: []
      }
      if(priceItem.type == 'buy') {
        product.purchasePrice = priceData
      } else {
        product.cityQuotations = [priceData]
      }
      tableData.push(product)
    }
  })

  productList.value = tableData
})
</script>

<template>
  <CardBox>
    <div class="product-list-wrapper overflow-x-auto">
      <NDataTable
        :columns="columns"
        :data="productList"
      />
    </div>
  </CardBox>
</template>

<style>
  
</style>