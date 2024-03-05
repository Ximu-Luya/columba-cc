type PriceTrend = 'up' | 'down'

type CityPrice = {
  cityName: string
  price: number
  pricePercent: number
  trend: PriceTrend
  uploadedAt: string
}
