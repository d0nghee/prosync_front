import React, { useEffect } from 'react'
import { getApi } from '../../../util/api'

export default function MyProject() {

  useEffect(() => {
    getApi("/my-projects")
      .then(() => {
        
      })
  })

  return (
    <div>Myporjdsaf</div>
  )
}
