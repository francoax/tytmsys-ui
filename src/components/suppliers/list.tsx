import { Badge, BadgeProps, Button, ButtonGroup, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material'
import TopButtons from 'components/common/buttons/topButtonOptions'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import { getSuppliers } from 'utils/redux/thunks/suppliersThunks'
import CardTravelIcon from '@mui/icons-material/CardTravel';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom'

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const ListOfSuppliers = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const suppliersStore = useAppSelector((state) => state.suppliers)

  useEffect(() => {
    if(suppliersStore.list.length < 1) {
      dispatch(getSuppliers())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(suppliersStore.isLoading) {
    return (
      <h1>Cargando...</h1>
    )
  }

  return (
    <>
      <TopButtons>
        <Button variant='contained'>Añadir nuevo proveedor</Button>
      </TopButtons>
      {suppliersStore.list.length < 1 ? 'No hay proveedores por el momento...' : (
        <TableContainer component={Paper} sx={{ maxHeight: '75vh' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight : 600}}>ID</TableCell>
                <TableCell sx={{ fontWeight : 600}}>NOMBRE</TableCell>
                <TableCell sx={{ fontWeight : 600}}>Direccion</TableCell>
                <TableCell sx={{ fontWeight : 600}}>Contacto</TableCell>
                <TableCell sx={{ fontWeight : 600}}>Productos</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {suppliersStore.list.map((sup, index) => (
                  <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{sup.id}</TableCell>
                  <TableCell>{sup.name}</TableCell>
                  <TableCell>{sup.address}</TableCell>
                  <TableCell>{sup.contact}</TableCell>
                  <TableCell>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <React.Fragment>
                          <IconButton aria-label="cart" {...bindTrigger(popupState)}>
                            <StyledBadge badgeContent={sup.items.length < 1 ? '0' : sup.items.length} color="secondary">
                              <CardTravelIcon />
                            </StyledBadge>
                          </IconButton>
                          <Menu {...bindMenu(popupState)}>
                            {sup.items.length < 1 ?
                              <MenuItem onClick={popupState.close}>Sin productos</MenuItem>
                            :
                              <>
                                {sup.items.map((item, key) => (
                                  <MenuItem
                                    key={key}
                                    onClick={() => {
                                      popupState.close();
                                      navigate(`/${item.id}`)
                                    }}
                                  >
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </>
                            }
                          </Menu>
                        </React.Fragment>
                      )}
                    </PopupState>
                  </TableCell>
                  <TableCell align='center'>
                    <ButtonGroup sx={{'boxShadow' : 'none', gap : '1em'}} variant="contained" aria-label="outlined primary button group">
                      <Button variant='contained'>Editar</Button>
                      <Button sx={{ backgroundColor : '#b90e0a', marginLeft : ''}}>Eliminar</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        )}
    </>
  )
}

export default ListOfSuppliers