const swap = (array, i, j) => {
  [array[i], array[j]] = [array[j], array[i]]
}

const partition = (array, left, right, index) => {
  const current = array[index]
  let pivot = left
  
  swap(array, index, right)
  for (let i = left; i < right; i++) {
    if (array[i] > current) {
      continue
    }
    swap(array, pivot, i)
    pivot++
  }
  swap(array, pivot, right)
  return pivot
}

export const quickSort = (array, left, right) {

  if (left >= right) return
  
  const index = left + Math.trunc((right - left) * Math.random())
  
  const pivot = partition(array, left, right, index)
  
  quickSort(array, left, pivot - 1)
  quickSort(array, pivot + 1, right)
}

export default function (array) {
  if (array.length < 2) return
  quickSort(array, 0, array.length - 1)
}
