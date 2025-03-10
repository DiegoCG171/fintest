import { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const usePasswordVisibility = () => {
  const [visibility, setVisibility] = useState<{ [key: string]: boolean }>({});

  const handleClickShowPassword = (field: string) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const getVisibilityProps = (field: string) => ({
    type: visibility[field] ? "text" : "password",
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => handleClickShowPassword(field)}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {visibility[field] ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  });

  return { getVisibilityProps };
};

export default usePasswordVisibility;
