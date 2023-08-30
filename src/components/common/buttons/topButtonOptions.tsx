import Stack from '@mui/material/Stack'
import React from 'react'

type Props = {
  children : string | JSX.Element | JSX.Element[]
}

const TopButtons = ( { children} : Props) => {
  return (
    <>
      <Stack direction='row' alignItems={'center'} spacing={15} sx={{ padding : '2em 0', minHeight : '65px'}}>
        {children}
      </Stack>
    </>
  )
}

export default TopButtons