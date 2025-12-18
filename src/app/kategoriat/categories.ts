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
    slug: "vaihtokaupat",
    title: "Vaihtokaupat kyläläisen kanssa",
    description:
      "Pelaajakohtainen vaihtokauppojen määrä kyläläisen kanssa palvelimella",
    data: [
      {
        type: "statistic",
        key: "minecraft:traded_with_villager",
      },
    ],
    icon: {
      src: "data:image/png;base64, UklGRrABAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSC0AAAABDzD/ERFCQSMpDkUAkrCOJASQwPeiIKL/EwDnLrPQWebEMvkvyIRJ6MxldgwAVlA4IFwBAAAwCQCdASogACAAPm0qk0akIiGhMBgIAIANiWwAnTMcfQ+CuA3gF2q+gB0r2AAfwDqco8C/d9V50DZNad8Yn5cSXVMf3a71drr9ehJ8GCOJeqnwAP7tSn+1R/KrFy7pMykw2U/10zzIX/BbaXVgWa11P+H//6W3Y5W0lrRH5i9J3vE0W7NtMwp2WpgENF7/bGYPNeDqn19ufz21GRan03/1dBjj+MV/1WFuo228DTHHc3j033hU5zx55cMv8gBk+hbuNuK+y5vrtHTW7/ltfp2oZY8zlS790lC1n+8Liq9WRL6yQ0INF87ICv//e07jL+AtGpQ0FF5b2ccwnNoPuvf06IYfjpwuEQVi6+oke5D5PFOPin+HDiOnswk/85qD/7j/v14wwnbuqVgvrM0916d5ikzXqX3r2L7uNWXDvUI8l1hgsLPDZKHuQ/BCnMjDV1qFn5tDRdiSd/hQAAA=",
      alt: "icon",
      height: 16,
      width: 16,
    },
    display: {
      type: "number",
      playerValue: {
        singular: "{value} kauppa",
        plural: "{value} kauppaa",
      },
      totalValue: {
        singular: "{value} kauppa",
        plural: "{value} kauppaa",
      },
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
  {
    slug: "kuolemat",
    title: "Kuolemat",
    description: "Pelaajakohtainen kuolemien määrä palvelimella",
    data: [
      {
        type: "statistic",
        key: "minecraft:deaths",
      },
    ],
    icon: {
      src: "data:image/png;base64,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",
      alt: "icon",
      height: 16,
      width: 16,
    },
    display: {
      type: "number",
      playerValue: {
        singular: "{value} kuolema",
        plural: "{value} kuolemaa",
      },
      totalValue: {
        singular: "{value} kuolema",
        plural: "{value} kuolemaa",
      },
    },
    sortFunction: "sortByGoals",
    sortReverse: false,
  },
  {
    slug: "tapettuja-hirvioita",
    title: "Tapettuja hirviöitä",
    description: "Pelaajakohtainen hirviöiden tappojen määrä palvelimella",
    data: [
      {
        type: "statistic",
        key: "minecraft:mob_kills",
      },
    ],
    icon: {
      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAADFlWrFgVrFZUG0RCBqXRiDRBhvTRuLNBhiLBBSLBAoFAoaz3hLAAAAAXRSTlMAQObYZgAAAF5JREFUeNpjQAWrofSqbgjN5ea2AcxYYZ6ZuRvEWORhUTYbJKMS7B4JklvskdKcDRIoaXFWmQ0WMDX0mLEBqCLJXSOzG2SISnPnTJDaVR2Vs3eDzW3ZvQFiw25UBwAADwAbKjm9kTYAAAAASUVORK5CYII=",
      alt: "icon",
      height: 16,
      width: 16,
    },
    display: {
      type: "number",
      playerValue: {
        singular: "{value} hirviö",
        plural: "{value} hirviötä",
      },
      totalValue: {
        singular: "{value} hirviö",
        plural: "{value} hirviötä",
      },
    },
    sortFunction: "sortByGoals",
    sortReverse: false,
  },
  {
    slug: "tapettuja-pelaajia",
    title: "Tapettuja pelaajia",
    description: "Pelaajakohtainen tappojen määrä palvelimella",
    data: [
      {
        type: "statistic",
        key: "minecraft:player_kills",
      },
    ],
    icon: {
      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAi0lEQVQ4y2NgIAO4uLj8h2GyNMOAhITEf7I079u3j3QDqKb5xo0bNNKMLVRBfJAmomwGKc7OzoYbQpJmZEOmTZsGVgzSBGKT5GeYASAMcg3JAYbuFZI1e5qJ/s/wkwNrhAUq0YaANHemq//XkOMGawBphBlEMPRBGGQzTDMygBlE0M8k+xfdBnINAAA+k7meeyM0+AAAAABJRU5ErkJggg==",
      alt: "icon",
      height: 16,
      width: 16,
    },
    display: {
      type: "number",
      playerValue: {
        singular: "{value} tappo",
        plural: "{value} tappoa",
      },
      totalValue: {
        singular: "{value} tappo",
        plural: "{value} tappoa",
      },
    },
    sortFunction: "sortByGoals",
    sortReverse: false,
  },
  {
    slug: "kasvatetut-elaimet",
    title: "Kasvatetut eläimet",
    description: "Pelaajakohtainen kasvatettujen eläinten määrä palvelimella",
    data: [
      {
        type: "statistic",
        key: "minecraft:animals_bred",
      },
    ],
    icon: {
      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAADcu2XNsVmmlVONdz1/ajNWUTi//tJYAAAAAXRSTlMAQObYZgAAAGZJREFUeNpjAAMHBghINYCwEoJdGVjAAk7OwWChEBUTE7CUiYiKihuIYSTs5JIApFkNjZyMw4AMZkVhlTCQSJigCZhmTU0OSwlgYGALMktLYEsDCiirJTCAAItpGAOEkQZlsDFAZABzGQ//xG79GgAAAABJRU5ErkJggg==",
      alt: "icon",
      height: 16,
      width: 16,
    },
    display: {
      type: "number",
      playerValue: {
        singular: "{value} eläin",
        plural: "{value} eläintä",
      },
      totalValue: {
        singular: "{value} eläin",
        plural: "{value} eläintä",
      },
    },
    sortFunction: "sortByGoals",
    sortReverse: false,
  },
  {
    slug: "arkkujen-avauksia",
    title: "Arkkujen avaukset",
    description: "Pelaajakohtainen arkkujen avausmäärä palvelimella",
    data: [
      {
        type: "statistic",
        key: "minecraft:chest_opened",
      },
    ],
    icon: {
      src: "data:image/png;base64,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",
      alt: "icon",
      height: 16,
      width: 16,
    },
    display: {
      type: "number",
      playerValue: {
        singular: "{value} avaus",
        plural: "{value} avausta",
      },
      totalValue: {
        singular: "{value} avaus",
        plural: "{value} avausta",
      },
    },
    sortFunction: "sortByGoals",
    sortReverse: false,
  },
  {
    slug: "kaloja-narrattu",
    title: "Kaloja narrattu",
    description: "Pelaajakohtainen narrattujen kalojen määrä palvelimella",
    data: [
      {
        type: "statistic",
        key: "minecraft:fish_caught",
      },
    ],
    icon: {
      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAf0lEQVQ4y2NgGAiQkpLy38XF5T/Zmj3NRP9ryHGTbgDIVpDmDD850g2Aae5MVwdrJskL6JphYmRrhoUF2ZqJMoBQgJWUlPynKLTxuoAqmrds3gzGpqam/7G5EKdmWCqbNm0aVgOI0gzigzQia/4PBMg0BgBpxJc8QS7CqZkSAADs7H6sIgQ4AAAAAABJRU5ErkJggg==",
      alt: "icon",
      height: 16,
      width: 16,
    },
    display: {
      type: "number",
      playerValue: {
        singular: "{value} kala",
        plural: "{value} kalaa",
      },
      totalValue: {
        singular: "{value} kala",
        plural: "{value} kalaa",
      },
    },
    sortFunction: "sortByGoals",
    sortReverse: false,
  },
  {
    slug: "matka-kaivoskarrylla",
    title: "Matka kaivoskarrylla",
    description: "Pelaajakohtainen matka kaivoskarrylla palvelimella",
    data: [
      {
        type: "statistic",
        key: "minecraft:minecart_one_cm",
      },
    ],
    calculate: {
      playerValue: "${minecraft:minecart_one_cm} / 100 / 1000",
      totalValue: "${total:minecraft:minecart_one_cm} / 100 / 1000",
      keys: ["minecraft:minecart_one_cm"],
    },
    icon: {
      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJ1BMVEUAAACprq+epKaUl5iAg4lrbnJnb3NCT1U/QkMuNj0lKzAjLC8JCQoQwjN+AAAAAXRSTlMAQObYZgAAAGlJREFUeNpjQAHdGyB0x8xqKD2zHCgEpIEMoBDHTBCjcgMDR+fMmbOmVwAZFjNnrVrRAmQkdgFpUSDDRGJFo2PKBgbuROdWFTE3oP5tYhuDUnqA5nAnb3XdfZoBCLZt6QFRQKHdp5FdAAAQEScXrNfWhAAAAABJRU5ErkJggg==",
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
    slug: "matka-veneella",
    title: "Matka veneellä",
    description: "Pelaajakohtainen matka veneellä palvelimella",
    data: [
      {
        type: "statistic",
        key: "minecraft:boat_one_cm",
      },
    ],
    calculate: {
      playerValue: "${minecraft:boat_one_cm} / 100 / 1000",
      totalValue: "${total:minecraft:boat_one_cm} / 100 / 1000",
      keys: ["minecraft:boat_one_cm"],
    },
    icon: {
      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAWlBMVEWIbkaCaUJvWjhuWThgTjBmRCxZSC1aQipUQCxbPSdRPyFWOSVQOyNNOyhHOiRFNSRDMB1BLxc6LR40KBspFw8AAADFpni8mGKfhE2DbD1vWjhZSC1HOiQ5JBsv8d/QAAAAFnRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIcgM1gAAAJFJREFUeNpdz8kOwjAMRVETaMpYpjSe//83sRtWfVIW9ywiGdbdIF4RsaXmBpSDdNPcqSaUIqhKhCgpEJ1psZB6hn+qiihqfcBI68osaNcn2PahGYagvT9g1FVYJITUyzcAO/MQVCgJKR3FmEJgcgzpRIa0yTSHRIunBFza7NTZfTkaIivc1nZ391drITHYn/8DSbwVtGoy8KkAAAAASUVORK5CYII=",
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
    slug: "ratsastettu-matka",
    title: "Ratsastettu matka",
    description: "Pelaajakohtainen ratsastettu matka palvelimella",
    data: [
      {
        type: "statistic",
        key: "minecraft:horse_one_cm",
      },
    ],
    calculate: {
      playerValue: "${minecraft:horse_one_cm} / 100 / 1000",
      totalValue: "${total:minecraft:horse_one_cm} / 100 / 1000",
      keys: ["minecraft:horse_one_cm"],
    },
    icon: {
      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAHlBMVEUAAADxi1ywmYjaZix/b2OnTiFVSEN/ORlRIQw1Fwoj1JBHAAAAAXRSTlMAQObYZgAAAE9JREFUeNpjIBZwlBdAGO2C5mC6o9hUFCjEXh5sbBwMZBQKlxobl04ASgRaBJtWABntraatoZ0MQDUV4a2VDRDdlRMgjJkTGFpgZqshrAEATKgTThuNjaAAAAAASUVORK5CYII=",
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
    slug: "esineita-kehitetty",
    title: "Esineitä kehitetty",
    description: "Pelaajakohtainen esineiden kehitysmäärä palvelimella",
    data: [
      {
        type: "statistic",
        key: "minecraft:enchant_item",
      },
    ],
    icon: {
      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAADW1ta3t7fTohbUlhqZmZlbW1ukLCtlSxfFEzmdGzeJISBUPhNSLhBEMxBsFxdEJQphFBQxIQQWEAV8/BcXAAAAAXRSTlMAQObYZgAAAG1JREFUeNp1z0EWgyAMBNA0NA0WwTG5/101Ik9dOLv5ZBbQa8zsWWvOlyxLzREbr6pTbi3kPJ7/0yUx7hIAOy5aiO4Vv5jwIZoShIXI64djhfRlFsMpgGgRgzt1EeZSeh2CskYdAvhKt7j76683mGkGwVjE2/sAAAAASUVORK5CYII=",
      alt: "icon",
      height: 16,
      width: 16,
    },
    display: {
      type: "number",
      playerValue: {
        singular: "{value} esine",
        plural: "{value} esinettä",
      },
      totalValue: {
        singular: "{value} esine",
        plural: "{value} esinettä",
      },
    },
    sortFunction: "sortByGoals",
    sortReverse: false,
  },
] as Kategoria[];
