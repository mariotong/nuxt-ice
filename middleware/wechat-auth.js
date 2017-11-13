export default function({ store, route, redirect }) {
  if(!store.state.authUser) {
    let { fullPath } = route

    console.log('fullPath是什么', fullPath)

    fullPath = encodeURIComponent(fullPath.substr(1))

    return redirect(`/wechat-redirect?visit=${fullPath}`)
  }
}
