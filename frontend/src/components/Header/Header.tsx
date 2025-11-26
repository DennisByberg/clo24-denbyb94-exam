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
import { IconChevronDown, IconChevronUp, IconLogout, IconUser } from '@tabler/icons-react';
import { mainLinks, bookingLinks, adminLinks } from '@/constants/navigation';
import { useAuth } from '@/hooks/useAuth';
import classes from './Header.module.css';

export default function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const [adminLinksOpened, { toggle: toggleAdminLinks }] = useDisclosure(false);
  const { user, logout } = useAuth();

  return (
    <Box>
      <header className={classes.header}>
        <Container size="xl" h="100%">
          <Group justify="space-between" h="100%">
            <Link href="/" className={classes.logo}>
              LOGO
            </Link>

            <Group h="100%" gap={0} visibleFrom="sm">
              {mainLinks.map((link) => (
                <Link key={link.href} href={link.href} className={classes.link}>
                  {link.label}
                </Link>
              ))}

              <HoverCard width={300} position="bottom" radius="md" shadow="md" withinPortal>
                <HoverCard.Target>
                  <UnstyledButton className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        Bookings
                      </Box>
                      <IconChevronDown size={16} />
                    </Center>
                  </UnstyledButton>
                </HoverCard.Target>

                <HoverCard.Dropdown>
                  {bookingLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={classes.subLink}
                      style={{ textDecoration: 'none', display: 'block' }}
                    >
                      <Text size="sm" fw={500}>
                        {item.label}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {item.description}
                      </Text>
                    </Link>
                  ))}
                </HoverCard.Dropdown>
              </HoverCard>

              <HoverCard width={300} position="bottom" radius="md" shadow="md" withinPortal>
                <HoverCard.Target>
                  <UnstyledButton className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        Admin
                      </Box>
                      <IconChevronDown size={16} />
                    </Center>
                  </UnstyledButton>
                </HoverCard.Target>

                <HoverCard.Dropdown>
                  {adminLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={classes.subLink}
                      style={{ textDecoration: 'none', display: 'block' }}
                    >
                      <Text size="sm" fw={500}>
                        {item.label}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {item.description}
                      </Text>
                    </Link>
                  ))}
                </HoverCard.Dropdown>
              </HoverCard>
            </Group>

            <Group visibleFrom="sm">
              {user ? (
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <UnstyledButton>
                      <Group gap="xs">
                        <Avatar src={user.picture} alt={user.name} size="sm" radius="xl" />
                        <div>
                          <Text size="sm" fw={500}>
                            {user.name}
                          </Text>
                          <Text size="xs" c="dimmed">
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
                    <Menu.Divider />
                    <Menu.Item leftSection={<IconLogout size={16} />} color="red" onClick={logout}>
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <Button disabled>Login</Button>
              )}
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
              aria-label="Toggle navigation menu"
            />
          </Group>
        </Container>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        title="Navigation Menu"
        zIndex={1000}
        aria-label="Navigation Menu"
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href} className={classes.link} onClick={closeDrawer}>
              {link.label}
            </Link>
          ))}

          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Bookings
              </Box>
              {linksOpened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>
            {bookingLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={classes.subLink}
                onClick={closeDrawer}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <Text size="sm" fw={500}>
                  {item.label}
                </Text>
                <Text size="xs" c="dimmed">
                  {item.description}
                </Text>
              </Link>
            ))}
          </Collapse>

          <UnstyledButton className={classes.link} onClick={toggleAdminLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Admin
              </Box>
              {adminLinksOpened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
            </Center>
          </UnstyledButton>
          <Collapse in={adminLinksOpened}>
            {adminLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={classes.subLink}
                onClick={closeDrawer}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <Text size="sm" fw={500}>
                  {item.label}
                </Text>
                <Text size="xs" c="dimmed">
                  {item.description}
                </Text>
              </Link>
            ))}
          </Collapse>

          <Divider my="md" />

          <Group justify="center" grow pb="xl" px="md">
            {user ? (
              <Button color="red" onClick={logout} leftSection={<IconLogout size={16} />}>
                Logout
              </Button>
            ) : (
              <Button disabled>Login</Button>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
