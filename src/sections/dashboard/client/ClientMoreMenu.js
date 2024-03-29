import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
// @mui
import { MenuItem, IconButton } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';

// ----------------------------------------------------------------------

ClientMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  onClientView: PropTypes.func,
  productName: PropTypes.string,
};

export default function ClientMoreMenu({ onDelete, onClientView, productName }) {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleViewClient = () => {
    navigate('/dashboard/clients/view')
  }

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>

        <MenuItem 
        onClick = {onClientView}
        // component={RouterLink} 
        // to={`${PATH_DASHBOARD.jasmin.root}/product/${paramCase(productName)}/edit`}
        >
          <Iconify icon={'carbon:view-filled'} sx={{ ...ICON }}/>
          View
        </MenuItem>
      </MenuPopover>
    </>
  );
}
