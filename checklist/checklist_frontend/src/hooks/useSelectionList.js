import { useState } from "react"

const useSelectionList = () => {
  const [selectionList, setSelectionList] = useState([])

  const length = () => {
    return selectionList.length
  }
  const get = index => {
    return selectionList[index]
  }
  const add = item => {
    setSelectionList([...selectionList, item])
  }
  const remove = item => {
    setSelectionList(selectionList.filter(inList => inList.id !== item.id))
  }
  const inList = item => {
    return selectionList.some(inList => inList.id === item.id)
  }
  const clear = () => {
    setSelectionList([])
  }

  return { selectionList, get, add, remove, inList, clear, length}
}

export default useSelectionList