export const reducer = (state, action) => {
  switch(action.type){
    case 'start':
      return {...state, loading: true}
    case 'success':
      return {data: action.data, loading: false, error: false}
    case 'fail':
      return {...state, loading: false, error: true}
  }
}