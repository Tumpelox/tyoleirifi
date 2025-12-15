import { Kategoria } from "./getCategory";

export default [
  {
    slug: "peliaika",
    title: "Peliaika",
    description: "Pelaajakohtainen peliaika palvelimella",
    data: [
      {
        type: "playtime",
        key: "playtime",
      },
    ],
    calculate: {
      playerValue: "${playtime} / 1000",
      totalValue: "${total:playtime} / 1000",
      keys: ["playtime"],
    },
    display: {
      type: "time",
      playerValue: null,
      totalValue: null,
    },
    icon: {
      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEUAAAD797f99V/61krMzADpsRXclhPZlBOyZBFsbIlJaNhWVm06U6x1KAIeHBwYFhZ3OCdYAAAAAXRSTlMAQObYZgAAAIRJREFUeNpjAIKODgYw6FAyBrM4gvp/mDYAGa36//9/jgAymv7Pe/fGFiijsXPmu1XBFxg49P/NfLXqMJBh/2+iDphh8f+TiUvxBQZeZUHlIOVgICPJ2Dg01OwCA8M1JeNQ41wGBoYbaUrKGb1ABm9bWkfHBQYguNvWcZeBAcy6y8DAAABuVS8QwSX0WAAAAABJRU5ErkJggg==",
      alt: "icon",
      height: 16,
      width: 16,
    },
    sortFunction: "sortByGoals",
    sortReverse: false,
  },
  {
    slug: "lentomatka",
    title: "Lennetty matka",
    description: "Pelaajakohtainen lentomatka palvelimella",
    data: [
      {
        type: "statistic",
        key: "minecraft:fly_one_cm",
      },
    ],
    calculate: {
      playerValue: "${minecraft:fly_one_cm} / 100 / 1000",
      totalValue: "${total:minecraft:fly_one_cm} / 100 / 1000",
      keys: ["minecraft:fly_one_cm"],
    },
    icon: {
      src: "data:image/png;base64, UklGRi4BAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSC4AAAABDzD/ERFCQSNJzQMCTtJZf0kvgN5BQUT/J0DOS5lYKRgiI/8yRuwpLEyCTuQYVlA4INoAAAAQBgCdASogACAAPm0uk0WkIqGYDAQAQAbEsoBlCP1W6tyJvciarkPsJLwoG41LpKQajhlDS8WClMAA/vxHaygB2OL7n9VeGz5vu24d01qrkP7DSHUkmN5PrHbP4J1SUsR+w0XGH8/HqKEcrniDkZg42g2+LDM2tNo8LkxeK45SHU7RXpYeQ6N3/9j3xsREiatddsCebBmUk6bZMI/i6xjNFmexQjtn5k27HOZRr4eKLTF9sC6GkkuWWTvMhC3T7F4V6reeidxjquNFJZfHBurJIArSBmBo4AAAAA==",
      alt: "icon",
      height: 16,
      width: 16,
    },
    display: {
      type: "number",
      playerValue: {
        singular: "{value} kilometri",
        plural: "{value} kilometriä",
      },
      totalValue: {
        singular: "{value} kilometri",
        plural: "{value} kilometriä",
      },
    },
    sortFunction: "sortByGoals",
    sortReverse: false,
  },
  {
    slug: "kavelymatka",
    title: "Kävelty matka",
    description: "Pelaajakohtainen kävelty matka palvelimella",
    data: [
      {
        type: "statistic",
        key: "minecraft:walk_one_cm",
      },
    ],
    calculate: {
      playerValue: "${minecraft:walk_one_cm} / 100 / 1000",
      totalValue: "${total:minecraft:walk_one_cm} / 100 / 1000",
      keys: ["minecraft:walk_one_cm"],
    },
    display: {
      type: "number",
      playerValue: {
        singular: "{value} kilometri",
        plural: "{value} kilometriä",
      },
      totalValue: {
        singular: "{value} kilometri",
        plural: "{value} kilometriä",
      },
    },
    icon: {
      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9TpX5UHCyi4pChOlkQFekoVSyChdJWaNXB5NIvaNKQpLg4Cq4FBz8Wqw4uzro6uAqC4AeIq4uToouU+L+k0CLWg+N+vLv3uHsHCLUSU82OSUDVLCMRjYjpzKroe0U3hjGIXoQlZuqx5GIKbcfXPTx8vQvxrPbn/hx9StZkgEcknmO6YRFvEM9uWjrnfeIAK0gK8TnxhEEXJH7kuuzyG+e8wwLPDBipxDxxgFjMt7DcwqxgqMQzxEFF1ShfSLuscN7irJYqrHFP/kJ/VltJcp3mKKJYQgxxiJBRQRElWAjRqpFiIkH7kTb+EccfJ5dMriIYORZQhgrJ8YP/we9uzdz0lJvkjwCdL7b9MQb4doF61ba/j227fgJ4n4Errekv14DwJ+nVphY8Avq3gYvrpibvAZc7wNCTLhmSI3lpCrkc8H5G35QBBm6BnjW3t8Y+Th+AFHW1fAMcHALjecpeb/Purtbe/j3T6O8HxSByyCRHpvIAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnCRkWIgfG6fe/AAAAsUlEQVQ4y2NgGPKAEV2Az97sP4z96eApRlxiWAGfvdn//////1/4+8V/DlWF/4TEGRgYGJjQDVn05yVWwxf9ecmw8tNHDHEmbIqxKcQmhtUAXApxAawuuHbjDukG8Nmb/bdZtxinQpihEgumMiAHJBO65ms37jD8evoJw4BfTz8xXLtxh0FLQwXFECZkG2Ca31VXomp+9gouhm4BPKH8evYKLvjj9gOsiQU9DeBSN8QAAEcPZkc1YPSGAAAAAElFTkSuQmCC",
      alt: "icon",
      height: 16,
      width: 16,
    },
    sortFunction: "sortByGoals",
    sortReverse: false,
  },
] as Kategoria[];
