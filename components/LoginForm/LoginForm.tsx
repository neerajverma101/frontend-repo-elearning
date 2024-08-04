"use client"
import {
    Anchor,
    Button,
    Checkbox,
    Divider,
    Group,
    Modal,
    Paper,
    PaperProps,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useDisclosure, useToggle } from '@mantine/hooks';
import { IconBrandGoogle, IconBrandTwitter } from '@tabler/icons-react';
import { useContext } from 'react';
import { AppContext } from '../AppContextProvider/AppContextProvider';
import { useRouter } from 'next/navigation';


const LoginForm = (props: PaperProps) => {
    const [type, toggle] = useToggle(['login', 'register']);
    const router = useRouter()
    const { contextData, setContextData } = useContext(AppContext)

    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    return (
        <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" fw={500}>
                Welcome to eLearning, {type} with
            </Text>

            <Group grow mb="md" mt="md">
                {/* <GoogleButton radius="xl">Google</GoogleButton> */}
                <Button leftSection={<IconBrandGoogle></IconBrandGoogle>} radius={"xl"} variant='outline'>
                    Google
                </Button>
                <Button leftSection={<IconBrandTwitter ></IconBrandTwitter>} radius={"xl"}>
                    Twitter
                </Button>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg" />

            <form onSubmit={form.onSubmit(() => { setContextData({ loginModal: false }); router.push('/dashboard') })}>
                <Stack>
                    {type === 'register' && (
                        <TextInput
                            label="Name"
                            placeholder="Your name"
                            value={form.values.name}
                            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                            radius="md"
                        />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@mantine.dev"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                        radius="md"
                    />

                    {type === 'register' && (
                        <Checkbox
                            label="I accept terms and conditions"
                            checked={form.values.terms}
                            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                        />
                    )}
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
                        {type === 'register'
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit" radius="xl">
                        {upperFirst(type)}
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}

const LoginFormModal = () => {
    const { contextData, setContextData } = useContext(AppContext)
    const [, { close }] = useDisclosure(false);

    return (
        <Modal opened={contextData.loginModal} onClose={() => { setContextData({ loginModal: false }); close() }} title="Sign In">
            <LoginForm></LoginForm>
        </Modal>
    )
}

export default LoginFormModal