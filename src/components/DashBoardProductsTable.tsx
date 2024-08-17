import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Image, Button, useDisclosure, FormControl, 
  FormLabel, Input,NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper,
  Textarea} from '@chakra-ui/react';
import TableSkelton from './TableSkelton';
import { useDeleteDashboardProductMutation, useGetDashboardProductsQuery,useUpdateDashboardProductMutation } from '../app/services/ApiSlice';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import AppAlertDialog from '../shared/AlertDialog';
import { useEffect, useState } from 'react';
import CustomModal from '../shared/Modal';
import { useSelector } from 'react-redux';
import { selectNetwork } from '../app/features/networkSlice';

const DashBoardProductsTable = () => {
  interface Product {
    id: number;
    title: string;
    description:string,
    price: number;
    stock: number;
   category: {
      title: string;
    };
  }
 const {isOnLine}= useSelector(selectNetwork)
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [clickedProductId, setClickedProductId] = useState(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
   const [destroyProduct, { isLoading: isDestroied, isSuccess }] = useDeleteDashboardProductMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
  const { isLoading, data } = useGetDashboardProductsQuery({ page: 1 });
  const [updateProduct,{isLoading:isUpdating,isSuccess:isUpdatingSuccess}]=useUpdateDashboardProductMutation()

  const onSubmitHandler=()=>{
    console.log(productToEdit)
      const formData=new FormData()
      formData.append('data',JSON.stringify({
        title:productToEdit?.title,
        description:productToEdit?.description,
        price:productToEdit?.price,
        stock:productToEdit?.stock

      }))
      if (thumbnail) {
        formData.append('files.thumbnail', thumbnail);
      }
      updateProduct({id:clickedProductId,body:formData});

    }

  useEffect(() => {
    if (isSuccess) {
      setClickedProductId(null);
      onClose();
    }
    if (isUpdatingSuccess) {
      setClickedProductId(null);
      onCloseModal();
    }
  }, [isSuccess,isUpdatingSuccess]);

  if (isLoading || !isOnLine) return <TableSkelton />;

  const handleDeleteClick = (productId) => {
    setClickedProductId(productId);
    onOpen();
  };
  const onChangeHandler = (e) => {
    if (productToEdit) {
      const { name, value } = e.target;
      setProductToEdit({ ...productToEdit, [name]: value });
    }
  };
  
  const onChangePriceHandler = (value: string) => {
    if (productToEdit) {
      setProductToEdit({ ...productToEdit, price: +value });
    }
  };
  
  const onChangeStockHandler = (value: string) => {
    if (productToEdit) {
      setProductToEdit({ ...productToEdit, stock: +value });
    }
  };
 const onChangrThumbnailHandler=(e)=>{
  setThumbnail(e.target.files[0])
 }

  return (
    <>
      <TableContainer maxW={'75%'} mx={'auto'}>
        <Table variant='simple'>
          <TableCaption>Total Entries: {data?.data?.length ?? 0}</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Thumbnail</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Stock</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data?.map((product) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{product?.attributes?.title}</Td>
                <Td>{product?.attributes?.category?.data?.attributes?.title}</Td>
                <Td>
                  <Image
                    src={`${import.meta.env.VITE_SERVER_KEY}${product?.attributes?.thumbnail?.data?.attributes?.formats?.thumbnail?.url}`}
                    alt={product?.attributes?.title}
                    borderRadius={'full'}
                    objectFit={'cover'}
                    boxSize={'40px'}
                  />
                </Td>
                <Td isNumeric>${product?.attributes?.price}</Td>
                <Td isNumeric>{product?.attributes?.stock}</Td>
                <Td>
                  <Button
                    as={Link}
                    to={`/products/${product.id}`}
                    colorScheme='purple'
                    variant={'solid'}
                    mr={3}
                  >
                    <AiOutlineEye size={17} />
                  </Button>
                  <Button
                    colorScheme='red'
                    variant={'solid'}
                    mr={3}
                    onClick={() => handleDeleteClick(product.id)}
                  >
                    <BsTrash size={17} />
                  </Button>
                  <Button
                    colorScheme='blue'
                    variant={'solid'}
                    onClick={() => {  
                      setClickedProductId(product.id)
                      setProductToEdit(product.attributes);
                      onOpenModal();}}
                  >
                    <FiEdit2 size={17} />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <AppAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        title={'Are You Sure?'}
        description={'Do you really want to destroy this product'}
        cancelText={'Cancel'}
        okText={'Ok'}
        onOkHandler={() => destroyProduct(clickedProductId)}
        isLoading={isDestroied}
      />

      <CustomModal
        isOpen={isOpenModal}
        onClose={onCloseModal}
        onOpen={onOpenModal}
        title={'Update Product'}
        cancelText={'Cancel'}
        okText={'Update'}
         onOkClick={onSubmitHandler}
         isLoading={isUpdating}>
        
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder='Title'
            name='title'
            value={productToEdit?.title}
            onChange={onChangeHandler}
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder='Description'
            name='description'
            value={productToEdit?.description}
            onChange={onChangeHandler}
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Price</FormLabel>
          <NumberInput
            defaultValue={productToEdit?.price}
            onChange={onChangePriceHandler}
            precision={2}
            step={0.2}
            name='price'
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Stock</FormLabel>
          <NumberInput
            defaultValue={productToEdit?.stock}
            onChange={onChangeStockHandler}
            precision={2}
            step={0.2}
            name='stock'
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            id='thumbnail'
            type='file'
            h={'full'}
            p={2}
            accept='image/png, image/gif, image/jpeg'
            onChange={onChangrThumbnailHandler}
          />
        </FormControl>
      </CustomModal>
    </>
  );
};

export default DashBoardProductsTable;
