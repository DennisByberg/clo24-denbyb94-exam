'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Avatar,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Container,
  Divider,
  Drawer,
  Group,
  HoverCard,
  Menu,
  ScrollArea,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCalendar,
  IconCards,
  IconChevronDown,
  IconChevronUp,
  IconHeartRateMonitor,
  IconLogout,
  IconUser,
  IconHome,
  IconInfoCircle,
  IconPhoto,
  IconToolsKitchen2,
  IconPool,
  IconPresentation,
} from '@tabler/icons-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import classes from './Header.module.css';

interface NavLink {
  href: string;
  label: string;
  disabled?: boolean;
  description?: string;
  icon?: React.ReactNode;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home', icon: <IconHome size={16} color="var(--mantine-color-red-6)" /> },
  {
    href: '/about',
    label: 'About',
    icon: <IconInfoCircle size={16} color="var(--mantine-color-red-6)" />,
  },
  {
    href: '/gallery',
    label: 'Gallery',
    icon: <IconPhoto size={16} color="var(--mantine-color-red-6)" />,
  },
  {
    href: '/bookings/dining',
    label: 'Dining & Drinking',
    description: 'Reserve a table at our restaurants',
    icon: <IconToolsKitchen2 size={16} color="var(--mantine-color-red-6)" />,
  },
  {
    href: '/bookings/spa',
    label: 'Pool Club & Spa',
    description: 'Book spa treatments and pool access',
    disabled: true,
    icon: <IconPool size={16} color="var(--mantine-color-red-6)" />,
  },
  {
    href: '/bookings/events',
    label: 'Conference & Events',
    description: 'Book spaces for events',
    disabled: true,
    icon: <IconPresentation size={16} color="var(--mantine-color-red-6)" />,
  },
  {
    href: '/admin/health',
    label: 'Health Checks',
    description: 'Monitor system health status',
    icon: <IconHeartRateMonitor size={16} color="var(--mantine-color-red-6)" />,
  },
] as const;

export default function Header() {
  // State & Hooks
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const user = session?.user;

  // Computed Values
  const mainLinks = navLinks.filter((link) => !link.description);
  const bookingLinks = navLinks.filter((link) => link.href.startsWith('/bookings'));

  return (
    <Box>
      {/* ====================================================================== */}
      {/* DESKTOP HEADER */}
      {/* ====================================================================== */}
      <Box component={'header'} h={60}>
        <Container size={'md'} h={'100%'}>
          <Group justify={'space-between'} h={'100%'}>
            {/* Logo */}
            <Box
              c={'var(--mantine-color-text)'}
              td={'none'}
              fw={600}
              component={Link}
              href={'/'}
              className={classes.logo}
            >
              <Group gap={'xs'}>
                <IconCards size={36} />
                <Text component={'span'} fw={600}>
                  ACE{' '}
                  <Text component={'span'} c={'red'} fw={600}>
                    GROUP
                  </Text>
                </Text>
              </Group>
            </Box>

            {/* Desktop Navigation Links */}
            <Group h={'100%'} gap={0} visibleFrom={'sm'}>
              {mainLinks.map((link) => (
                <Box
                  key={link.href}
                  component={Link}
                  href={link.href}
                  className={`${classes.link} ${link.disabled ? classes.linkDisabled : ''}`}
                  data-active={pathname === link.href || undefined}
                >
                  <Group gap={'xs'} align={'center'}>
                    {link.icon}
                    <span>{link.label}</span>
                  </Group>
                </Box>
              ))}

              {/* Bookings Dropdown Menu */}
              <HoverCard width={300} position={'bottom'} radius={'md'} shadow={'md'} withinPortal>
                <HoverCard.Target>
                  <UnstyledButton
                    className={classes.dropdownButton}
                    data-active={bookingLinks.some((link) => pathname === link.href) || undefined}
                  >
                    <Center inline>
                      <IconCalendar size={16} color="var(--mantine-color-red-6)" />
                      <Box component={'span'} ml={5} mr={5}>
                        Bookings
                      </Box>
                      <IconChevronDown size={16} />
                    </Center>
                  </UnstyledButton>
                </HoverCard.Target>

                <HoverCard.Dropdown>
                  {bookingLinks.map((item) => (
                    <Box
                      key={item.href}
                      component={Link}
                      href={item.href}
                      className={`${classes.subLink} ${item.disabled ? classes.subLinkDisabled : ''}`}
                    >
                      <Group gap={'xs'} align={'start'}>
                        {item.icon}
                        <div>
                          <Text size={'sm'} fw={500}>
                            {item.label}
                          </Text>
                          <Text size={'xs'} c={'dimmed'}>
                            {item.description}
                          </Text>
                        </div>
                      </Group>
                    </Box>
                  ))}
                </HoverCard.Dropdown>
              </HoverCard>
            </Group>

            {/* User Account Menu */}
            <Group visibleFrom={'sm'}>
              {user ? (
                <Menu shadow={'md'} width={220}>
                  <Menu.Target>
                    <UnstyledButton
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--mantine-radius-md)',
                        transition: 'all 200ms ease',
                      }}
                      styles={{
                        root: {
                          '&:hover': {
                            backgroundColor: 'var(--mantine-color-dark-6)',
                          },
                        },
                      }}
                    >
                      <Group gap={'xs'}>
                        {user.picture ? (
                          <Avatar src={user.picture} alt={user.name} size={'sm'} radius={'xl'} />
                        ) : (
                          <IconUser size={18} color="var(--mantine-color-red-6)" />
                        )}
                        <div>
                          <Text size={'sm'} fw={500} lineClamp={1} maw={120}>
                            {user.name}
                          </Text>
                        </div>
                        <IconChevronDown size={14} color="var(--mantine-color-red-6)" />
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>
                      <Group gap={'xs'}>
                        {user.picture ? (
                          <Avatar src={user.picture} alt={user.name} size={'sm'} radius={'xl'} />
                        ) : (
                          <IconUser size={18} color="var(--mantine-color-red-6)" />
                        )}
                        <div>
                          <Text size={'sm'} fw={500} truncate>
                            {user.name}
                          </Text>
                          <Text size={'xs'} c={'dimmed'} truncate>
                            {user.email}
                          </Text>
                        </div>
                      </Group>
                    </Menu.Label>
                    <Menu.Divider />
                    <Menu.Item
                      leftSection={<IconUser size={16} color="var(--mantine-color-red-6)" />}
                      disabled
                    >
                      Profile
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconCalendar size={16} color="var(--mantine-color-red-6)" />}
                      component={Link}
                      href={'/my-bookings'}
                    >
                      My Bookings
                    </Menu.Item>
                    <Menu.Item
                      leftSection={
                        <IconHeartRateMonitor size={16} color="var(--mantine-color-red-6)" />
                      }
                      component={Link}
                      href={'/admin/health'}
                    >
                      Health Checks
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      leftSection={<IconLogout size={16} color="var(--mantine-color-red-6)" />}
                      color={'red'}
                      onClick={() => signOut()}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Button component={Link} href="/login">Login</Button>
              )}
            </Group>

            {/* Mobile Menu Toggle */}
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom={'sm'}
              aria-label={'Toggle navigation menu'}
            />
          </Group>
        </Container>
      </Box>

      {/* ====================================================================== */}
      {/* MOBILE DRAWER MENU */}
      {/* ====================================================================== */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size={'100%'}
        title={'Navigation Menu'}
        zIndex={1000}
        aria-label={'Navigation Menu'}
      >
        <ScrollArea h={'calc(100vh - 80px)'} mx={'-md'}>
          {/* Mobile Navigation Links */}
          {mainLinks.map((link) => (
            <Box
              key={link.href}
              component={Link}
              href={link.href}
              className={`${classes.link} ${link.disabled ? classes.linkDisabled : ''}`}
              onClick={!link.disabled ? closeDrawer : undefined}
            >
              <Group gap={'xs'} align={'center'}>
                {link.icon}
                <span>{link.label}</span>
              </Group>
            </Box>
          ))}

          {/* Mobile Bookings Dropdown */}
          <UnstyledButton className={classes.mobileDropdownButton} onClick={toggleLinks}>
            <Center inline>
              <IconCalendar size={16} color="var(--mantine-color-red-6)" />
              <Box component={'span'} ml={5} mr={5}>
                Bookings
              </Box>
              {linksOpened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>
            {bookingLinks.map((item) => (
              <Box
                key={item.href}
                component={Link}
                href={item.href}
                className={`${classes.subLink} ${item.disabled ? classes.subLinkDisabled : ''}`}
                onClick={!item.disabled ? closeDrawer : undefined}
              >
                <Group gap={'xs'} align={'start'}>
                  {item.icon}
                  <div>
                    <Text size={'sm'} fw={500}>
                      {item.label}
                    </Text>
                    <Text size={'xs'} c={'dimmed'}>
                      {item.description}
                    </Text>
                  </div>
                </Group>
              </Box>
            ))}
          </Collapse>

          <Divider my={'md'} />

          {/* Mobile User Info */}
          {user && (
            <Box px={'md'} pb={'md'}>
              <Group gap={'xs'}>
                <Avatar src={user.picture} alt={user.name} size={'sm'} radius={'xl'} />
                <div>
                  <Text size={'sm'} fw={500}>
                    {user.name}
                  </Text>
                  <Text size={'xs'} c={'dimmed'}>
                    {user.email}
                  </Text>
                </div>
              </Group>
            </Box>
          )}

          {/* Mobile Action Buttons */}
          <Stack gap={'md'} pb={'xl'} px={'md'}>
            {user && (
              <>
                <Button
                  component={Link}
                  href={'/my-bookings'}
                  onClick={closeDrawer}
                  variant={'default'}
                  fullWidth
                  leftSection={<IconCalendar size={16} color="var(--mantine-color-red-6)" />}
                >
                  My Bookings
                </Button>

                <Button
                  component={Link}
                  href={'/admin/health'}
                  onClick={closeDrawer}
                  variant={'default'}
                  fullWidth
                  leftSection={
                    <IconHeartRateMonitor size={16} color="var(--mantine-color-red-6)" />
                  }
                >
                  Health Checks
                </Button>
              </>
            )}

            {user ? (
              <Button
                color={'red'}
                onClick={() => signOut()}
                leftSection={<IconLogout size={16} color="var(--mantine-color-red-6)" />}
                fullWidth
              >
                Logout
              </Button>
            ) : (
              <Button component={Link} href="/login" fullWidth>
                Login
              </Button>
            )}
          </Stack>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
