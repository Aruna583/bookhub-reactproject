import React from 'react'

const FavoriteContext = React.createContext({
  favoriteList: [],
  onToggleFavorite: () => {},
  isChecked: false,
})

export default FavoriteContext
