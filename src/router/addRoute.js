import router from '../router'


export function addRoute(menuData) {
  if(!menuData) return
  const menuArray = []
  // console.log('menuData:',menuData)
  // console.log('type:',typeof(menuData))
  menuData.forEach(item => {
    // if(item.hasOwnProperty.call('children')) {
      // console.log('item:',item)
    if(item.children) {
      // console.log('1212')
      item.children = item.children.map(item => {
        item.component = () => import(`../views/${item.url}`)
        return item
      })
      menuArray.push(...item.children)
    } else {
      item.component = () => import(`../views/${item.url}`)
      menuArray.push(item)
    }
  })
  // console.log('scfaz:',menuArray)
  menuArray.forEach(item => {
    router.addRoute('main', item)
  })
}