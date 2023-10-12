import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Button from '@mui/material/Button';
import { useAppSelector } from 'utils/redux/hooks';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import styles from './items.module.css'
import TopButtons from 'components/common/buttons/topButtonOptions';
import BackButton from 'components/common/buttons/backButton';
import { StockMovement } from 'utils/models/stockMovements';
import ConfirmWithdraw from './forms/confirmWithDrawForm';
import { useEffect, useState } from 'react';
import Item from 'utils/models/items';
import ItemManagement from './forms/itemManagement';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function CustomPaginationActionsTable() {

  const { id } = useParams()

  // const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.items.list.find(it => it.id.toString() === id))

  const [itemDetail, setItemDetail] = useState<Item | undefined>(item)

  const [showEditForm, setFormEdit] = useState(false)

  useEffect(() => {
    setItemDetail(item)
  }, [item])

  if(!itemDetail) {
    <Navigate to="/" />
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.

  const length = itemDetail?.stockMovements.length ?? 0;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const realAmountUsed = (sm : StockMovement) => {

    if(sm.action === 'retiro' && sm.state === 'pendiente') {
      return (
      <>
        En espera de confirmacion
      </>
      )
    }

    if(sm.state !== 'pendiente' && sm.action === 'retiro') {
      return (
        <>
          {sm.realAmountUsed} {itemDetail?.unit}
        </>
      )
    }

    if(sm.action === 'ingreso') {
      return (
        <>
          -
        </>
      )
    }

    return ''
  }

  const [showForm, setForm] = useState<{show : boolean, id? : number}>({ show : false })

  return (
    <>
      <TopButtons>
        <BackButton />
        <Button variant='contained' onClick={() => setFormEdit(true)}>Editar Producto</Button>
      </TopButtons>
      <h1 className={styles.title}>Detalle de producto <span>{itemDetail?.name}</span></h1>
      <div className={styles.itemInfoContainer}>
        <div className={styles.detail}>
          <p>Nombre: {itemDetail?.name}</p>
        </div>
        <div className={styles.detail}>
          <p>Proveedores: {itemDetail?.suppliers.map((sup : string, index) =>
            (<span key={index}>{sup}, </span>))}
          </p>
        </div>
        <div className={styles.detail}>
          <p>Categoria: {itemDetail?.category}</p>
        </div>
        <div className={styles.detail}>
          <p>Unidad: {itemDetail?.unit}</p>
        </div>
        <div className={styles.detail}>
          <p>Stock actual: {itemDetail?.actualStock} {item?.unit}</p>
        </div>
      </div>
      <h2 className={styles.stockTitle}>Movimientos de stock</h2>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableCell>Accion</TableCell>
          <TableCell>Cantidad</TableCell>
          <TableCell>Cantidad real usada</TableCell>
          <TableCell align='center'>Estado</TableCell>
          <TableCell>Precio total</TableCell>
          <TableCell>Dolar a la fecha</TableCell>
          <TableCell>Fecha de accion</TableCell>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? item?.stockMovements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) || []
            : item?.stockMovements || []
          ).map((sm, index) => (
            <TableRow key={index} sx={sm.action === 'ingreso' ?
              {backgroundColor : 'rgba(51, 170, 51, .4)', borderRadius : '5px'}
               :
               sm.state !== 'confirmado' ?
                {backgroundColor : 'rgba(102, 172, 197, 0.7)', borderRadius : '5px'}
                  :
                {backgroundColor : 'rgba(221, 86, 28, 0.4)', borderRadius : '5px'}}>
              <TableCell style={{ width: 160 }} component="th" scope="row">
                {sm.action.toUpperCase()}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {sm.amount} <span style={{'fontSize' : '0.8rem'}}>{item?.unit}</span>
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {/* {sm.realAmountUsed === 0 && sm.action === 'retiro' ? 'En espera de confirmacion' :
                <>
                {sm.realAmountUsed} <span style={{'fontSize' : '0.8rem'}}>{item?.unit}</span>
                </> } */
                realAmountUsed(sm)}
              </TableCell>
              <TableCell style={{ width: 160 }} align='center'>
                {sm.state === 'pendiente' ?
                  <div style={{ display : 'flex', alignItems : 'center', justifyContent : 'space-around'}}>
                    <span style={{ fontSize : '1rem'}}>{sm.state?.toUpperCase()}</span>
                    <Button variant='outlined' onClick={() => setForm({ show : true, id : sm.id})}>Confirmar</Button>
                  </div>
                  : ''
              }
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {sm.totalPrice === 0 ? '-' : `$${sm.totalPrice}`}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {sm.dollarAtDate === 0 ? '-' : `U$S${sm.dollarAtDate}`}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {sm.dateOfAction.toString()}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={7} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={7}
              count={item?.stockMovements.length || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    {showForm.show && <ConfirmWithdraw id={showForm.id} item={item} displayHandler={setForm} />}
    {showEditForm && <ItemManagement itemToUpdate={itemDetail} showHandler={setFormEdit} use='edit' />}
    </>
  );
}