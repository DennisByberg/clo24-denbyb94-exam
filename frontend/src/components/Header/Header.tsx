'use client';

import Link from 'next/link';
import {
  ActionIcon,
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
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCalendar,
  IconChevronDown,
  IconChevronUp,
  IconHeartRateMonitor,
  IconLogout,
  IconMoon,
  IconSun,
  IconUser,
} from '@tabler/icons-react';
import { useAuth } from '@/hooks/useAuth';
import classes from './Header.module.css';

interface NavLink {
  href: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  {
    href: '/bookings/dining',
    label: 'Dining & Drinking',
    description: 'Reserve a table at our restaurants',
  },
  {
    href: '/bookings/spa',
    label: 'Pool Club & Spa',
    description: 'Book spa treatments and pool access',
    disabled: true,
  },
  {
    href: '/bookings/events',
    label: 'Conference & Events',
    description: 'Book spaces for events',
    disabled: true,
  },
  {
    href: '/admin/health',
    label: 'Health Checks',
    description: 'Monitor system health status',
  },
] as const;

export default function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { user, login, logout } = useAuth();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const mainLinks = navLinks.filter((link) => !link.description);
  const bookingLinks = navLinks.filter((link) => link.href.startsWith('/bookings'));

  return (
    <Box>
      <Box component={'header'} h={60}>
        <Container size={'lg'} h={'100%'}>
          <Group justify={'space-between'} h={'100%'}>
            <Box component={Link} href={'/'} className={classes.logo}>
              ACE GROUP
            </Box>

            <Group h={'100%'} gap={0} visibleFrom={'sm'}>
              {mainLinks.map((link) => (
                <Box
                  key={link.href}
                  component={Link}
                  href={link.href}
                  className={classes.link}
                  style={{
                    opacity: link.disabled ? 0.5 : 1,
                    pointerEvents: link.disabled ? 'none' : 'auto',
                  }}
                >
                  {link.label}
                </Box>
              ))}

              <HoverCard width={300} position={'bottom'} radius={'md'} shadow={'md'} withinPortal>
                <HoverCard.Target>
                  <UnstyledButton className={classes.dropdownButton}>
                    <Center inline>
                      <Box component={'span'} mr={5}>
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
                      className={classes.subLink}
                      style={{
                        opacity: item.disabled ? 0.5 : 1,
                        pointerEvents: item.disabled ? 'none' : 'auto',
                      }}
                    >
                      <Text size={'sm'} fw={500}>
                        {item.label}
                      </Text>
                      <Text size={'xs'} c={'dimmed'}>
                        {item.description}
                      </Text>
                    </Box>
                  ))}
                </HoverCard.Dropdown>
              </HoverCard>
            </Group>

            <Group visibleFrom={'sm'}>
              <ActionIcon
                onClick={() => toggleColorScheme()}
                variant={'default'}
                size={'lg'}
                aria-label={'Toggle color scheme'}
              >
                {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
              </ActionIcon>

              {user ? (
                <Menu shadow={'md'} width={200}>
                  <Menu.Target>
                    <UnstyledButton>
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
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item leftSection={<IconUser size={16} />} disabled>
                      Profile
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconCalendar size={16} />}
                      component={Link}
                      href={'/my-bookings'}
                    >
                      My Bookings
                    </Menu.Item>
                    <Menu.Item
                      leftSection={<IconHeartRateMonitor size={16} />}
                      component={Link}
                      href={'/admin/health'}
                    >
                      Health Checks
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      leftSection={<IconLogout size={16} />}
                      color={'red'}
                      onClick={logout}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Button onClick={login}>Login</Button>
              )}
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom={'sm'}
              aria-label={'Toggle navigation menu'}
            />
          </Group>
        </Container>
      </Box>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size={'100%'}
        title={'Navigation Menu'}
        zIndex={1000}
        aria-label={'Navigation Menu'}
      >
        <ScrollArea h={'calc(100vh - 80px)'} mx={'-md'}>
          {mainLinks.map((link) => (
            <Box
              key={link.href}
              component={Link}
              href={link.href}
              className={classes.link}
              onClick={!link.disabled ? closeDrawer : undefined}
              style={{
                opacity: link.disabled ? 0.5 : 1,
                pointerEvents: link.disabled ? 'none' : 'auto',
              }}
            >
              {link.label}
            </Box>
          ))}

          <UnstyledButton className={classes.mobileDropdownButton} onClick={toggleLinks}>
            <Center inline>
              <Box component={'span'} mr={5}>
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
                className={classes.subLink}
                onClick={!item.disabled ? closeDrawer : undefined}
                style={{
                  opacity: item.disabled ? 0.5 : 1,
                  pointerEvents: item.disabled ? 'none' : 'auto',
                }}
              >
                <Text size={'sm'} fw={500}>
                  {item.label}
                </Text>
                <Text size={'xs'} c={'dimmed'}>
                  {item.description}
                </Text>
              </Box>
            ))}
          </Collapse>

          <Divider my={'md'} />

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

          <Stack gap={'md'} pb={'xl'} px={'md'}>
            <Button
              onClick={() => toggleColorScheme()}
              variant={'default'}
              fullWidth
              leftSection={colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
            >
              {colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>

            {user && (
              <>
                <Button
                  component={Link}
                  href={'/my-bookings'}
                  onClick={closeDrawer}
                  variant={'default'}
                  fullWidth
                  leftSection={<IconCalendar size={16} />}
                >
                  My Bookings
                </Button>

                <Button
                  component={Link}
                  href={'/admin/health'}
                  onClick={closeDrawer}
                  variant={'default'}
                  fullWidth
                  leftSection={<IconHeartRateMonitor size={16} />}
                >
                  Health Checks
                </Button>
              </>
            )}

            {user ? (
              <Button
                color={'red'}
                onClick={logout}
                leftSection={<IconLogout size={16} />}
                fullWidth
              >
                Logout
              </Button>
            ) : (
              <Button onClick={login} fullWidth>
                Login
              </Button>
            )}
          </Stack>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
