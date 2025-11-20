import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Logo,
  SearchBar,
  NavigationMenu,
  ActionButtons,
  NavigationItem,
  LanguageToggle,
} from "../components/UI";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255,255,255,0.7)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  color: theme.palette.text.primary,
  border: '1px solid rgba(200,200,200,0.18)',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 70,
  padding: '0 32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    padding: '0 16px',
    minHeight: 60,
  },
}));

const DesktopNavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
  gap: 0,
  padding: 0,
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: 350,
  margin: '0 24px',
  [theme.breakpoints.down('lg')]: {
    maxWidth: 220,
    margin: '0 10px',
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.secondary.main,
  background: 'rgba(255,255,255,0.7)',
  borderRadius: '50%',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  padding: 8,
  '&:hover': {
    background: 'rgba(217,34,40,0.08)',
  },
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  width: 320,
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  background: 'rgba(255,255,255,0.85)',
  backdropFilter: 'blur(16px)',
}));

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();

  const navigationItems: NavigationItem[] = [
    { label: t.nav.buy, href: "/listings?type=sale" },
    { label: t.nav.sell, href: "/sell" },
    { label: t.nav.rent, href: "/listings?type=rent" },
    { label: t.nav.aboutUs, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  const actionButtons = isAuthenticated
    ? []
    : [
        { label: t.nav.login, variant: "outlined" as const, href: "/login" },
        { label: t.nav.signup, variant: "contained" as const, href: "/signup" },
      ];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigate = useNavigate();
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // Implement search functionality here
  };

  return (
    <>
      <StyledAppBar position="static" elevation={0}>
        <StyledToolbar>
          <DesktopNavContainer>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Logo href="/" />
            </Box>

            {/* Navigation Items - pill shaped */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {navigationItems.map((item, idx) => (
                  <Button
                    key={item.label}
                    href={item.href}
                    variant="text"
                    sx={{
                      borderRadius: '20px',
                      px: 2.5,
                      py: 1,
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                      background: 'transparent',
                      transition: 'all 0.2s',
                      fontSize: '1rem',
                      letterSpacing: '0.2px',
                      '&:hover': {
                        background: theme.palette.secondary.light,
                        color: theme.palette.secondary.main,
                        boxShadow: '0 2px 8px rgba(217,34,40,0.08)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Divider */}
            {!isMobile && (
              <Box sx={{ height: 36, width: '1.5px', background: '#e0e0e0', mx: 2, borderRadius: 1 }} />
            )}

            {/* Search, Language, User/Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {!isMobile && (
                <SearchContainer>
                  <SearchBar onSearch={handleSearch} variant="navbar" />
                </SearchContainer>
              )}
              <LanguageToggle />
              {!isMobile ? (
                isAuthenticated && user ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ color: theme.palette.secondary.main, fontWeight: 500 }}>
                      {t.nav.welcome}, {user.name}
                    </Typography>
                    <Button
                      onClick={handleUserMenuOpen}
                      sx={{
                        color: theme.palette.secondary.main,
                        textTransform: 'none',
                        fontWeight: 500,
                        fontSize: '1rem',
                        borderRadius: '8px',
                        px: 1.5,
                        background: 'rgba(217,34,40,0.07)',
                        '&:hover': { backgroundColor: 'rgba(217,34,40,0.13)' },
                      }}
                    >
                      ▼
                    </Button>
                    <Menu
                      anchorEl={userMenuAnchor}
                      open={Boolean(userMenuAnchor)}
                      onClose={handleUserMenuClose}
                    >
                      <MenuItem onClick={() => { handleUserMenuClose(); navigate('/profile'); }}>{t.nav.profile || 'Profile'}</MenuItem>
                      <MenuItem onClick={handleLogout}>{t.nav.logout}</MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <ActionButtons buttons={actionButtons} />
                )
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <MobileMenuButton
                    onClick={handleMobileMenuToggle}
                    aria-label="open menu"
                  >
                    <MenuIcon />
                  </MobileMenuButton>
                </Box>
              )}
            </Box>
          </DesktopNavContainer>
        </StyledToolbar>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 320,
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: '18px 0 0 18px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          },
        }}
      >
        <DrawerContent>
          <Box>
            <SearchBar onSearch={handleSearch} variant="mobile" fullWidth />
          </Box>
          <NavigationMenu items={navigationItems} variant="mobile" />
          {isAuthenticated && user ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.secondary.main, textAlign: 'center', fontWeight: 500 }}
              >
                {t.nav.welcome}, {user.name}
              </Typography>
              <Button
                onClick={() => {
                  window.location.href = '/profile';
                  setMobileMenuOpen(false);
                }}
                variant="contained"
                fullWidth
                sx={{ borderRadius: '10px', fontWeight: 500 }}
              >
                {t.nav.profile || 'Profile'}
              </Button>
              <Button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                variant="outlined"
                fullWidth
                sx={{ borderRadius: '10px', fontWeight: 500 }}
              >
                {t.nav.logout}
              </Button>
            </Box>
          ) : (
            <ActionButtons buttons={actionButtons} variant="mobile" />
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
