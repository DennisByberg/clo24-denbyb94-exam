'use client';

import Link from 'next/link';
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
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCalendar,
  IconChevronDown,
  IconChevronUp,
  IconLogout,
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
  const [adminLinksOpened, { toggle: toggleAdminLinks }] = useDisclosure(false);
  const { user, login, logout } = useAuth();

  const mainLinks = navLinks.filter((link) => !link.description);
  const bookingLinks = navLinks.filter((link) => link.href.startsWith('/bookings'));
  const adminLinks = navLinks.filter((link) => link.href.startsWith('/admin'));

  return (
    <Box>
      <Box component={'header'} h={60}>
        <Container size={'xl'} h={'100%'}>
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

              <HoverCard width={300} position={'bottom'} radius={'md'} shadow={'md'} withinPortal>
                <HoverCard.Target>
                  <UnstyledButton className={classes.dropdownButton}>
                    <Center inline>
                      <Box component={'span'} mr={5}>
                        Admin
                      </Box>
                      <IconChevronDown size={16} />
                    </Center>
                  </UnstyledButton>
                </HoverCard.Target>

                <HoverCard.Dropdown>
                  {adminLinks.map((item) => (
                    <Box
                      key={item.href}
                      component={Link}
                      href={item.href}
                      className={classes.subLink}
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

          <UnstyledButton className={classes.mobileDropdownButton} onClick={toggleAdminLinks}>
            <Center inline>
              <Box component={'span'} mr={5}>
                Admin
              </Box>
              {adminLinksOpened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
            </Center>
          </UnstyledButton>
          <Collapse in={adminLinksOpened}>
            {adminLinks.map((item) => (
              <Box
                key={item.href}
                component={Link}
                href={item.href}
                className={classes.subLink}
                onClick={closeDrawer}
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

          <Group justify={'center'} grow pb={'xl'} px={'md'}>
            {user ? (
              <Button color={'red'} onClick={logout} leftSection={<IconLogout size={16} />}>
                Logout
              </Button>
            ) : (
              <Button onClick={login}>Login</Button>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
