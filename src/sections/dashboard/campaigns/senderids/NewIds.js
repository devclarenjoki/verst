import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
// @mui
import { styled, useTheme } from '@mui/material/styles';

import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

// import {  } from '@mui/material';
// components
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { createProvider, createUser, getClients, getGroups } from '../../../../redux/slices/jasmine';
import useAuth from '../../../../hooks/useAuth';
import { createClient } from '../../../../redux/slices/clients';
import { createSenderIds } from '../../../../redux/slices/campaigns';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

NewIds.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteUsers: PropTypes.func,
  onCloseModal: PropTypes.func,
};

// ----------------------------------------------------------------------

const style = {
  height: 'auto',
  position: 'absolute',
  top: '50%',
  // bottom: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
  overflow: 'scroll',
};

const accounts = ['ADMINISTRATOR', 'RESELLER', 'CLIENT'];

export default function NewIds({ numSelected, filterName, onFilterName, onDeleteUsers, onCloseModal }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isLight = theme.palette.mode === 'light';
  const { smppUsers, clients, jasminGroups } = useSelector((state) => state.jasmine);
  const { user } = useAuth();

  // console.log(stateClients, 'user clients')

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const IdsSchema = Yup.object().shape({
    senderValue: Yup.string().required('Sender value is required'),
    purpose: Yup.string().required('Purpose is required'),
  });

  const defaultValues = {
    senderValue: '',
    purpose: '',
  };

  const methods = useForm({
    resolver: yupResolver(IdsSchema),
    defaultValues,
  });

  useEffect(() => {
    // dispatch(getClients());
    // dispatch(getGroups());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const {
    reset,
    watch,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      // console.log(values, 'data');
      // console.log(values);
      await dispatch(
        createSenderIds({
          clientId: user?.clientId,
          senderValue: values.senderValue,
          purpose: values.purpose,
        })
      );
      onCloseModal();
      //   setOpen(false);
      enqueueSnackbar('Sender Id created successfully');
      reset();
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

      <Box sx={style}>
        <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            New Sender Id
          </Typography>

          <CloseIcon onClick={onCloseModal} sx={{ cursor: 'pointer' }} />
        </Stack>
        <Stack spacing={2} sx={{ my: 2 }}>
          <RHFTextField name="senderValue" label="Sender Value" size="small" />
          <RHFTextField name="purpose" label="Purpose" size="small" />
        </Stack>

        <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" startIcon={<CloseIcon />} onClick={onCloseModal}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            startIcon={<SaveIcon />}
            sx={{ backgroundColor: theme.palette.Verst.orange }}
          >
            Save
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}
