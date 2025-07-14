
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Input, Form, Divider } from 'antd';
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { api } from '../utils/apiClient';
import { useAuth } from '../hooks/useAuth';
import styles from './LoginPage.module.css';


const loginPosters = [
    { src: '/login/poster01.png', bg: '#1e6847' },
    //{ src: '/login/poster02.png', bg: '#598b7e'},
    //{ src: '/login/poster03.png', bg: '#53a243'},
    //{ src: '/login/poster04.png', bg: '#10273d'},p
    //{ src: '/login/poster05.png', bg: '#f0c78a'},
    { src: '/login/poster06.png', bg: '#3a8a5c'},
    { src: '/login/poster07.png', bg: '#e24033'},
    //{ src: '/login/poster08.png', bg: '#2c7234'},
    //{ src: '/login/poster09.png', bg: '#f3a52a'},
    //{ src: '/login/poster10.png', bg: '#dc8d1f'},
    //{ src: '/login/poster11.png', bg: '#443313'},
    //{ src: '/login/poster12.png', bg: '#da8b1c'},
    { src: '/login/poster13.png', bg: '#0d240c'},
    //{ src: '/login/poster14.png', bg: '#f6c646'},
    { src: '/login/poster15.png', bg: '#2795c9'},
    //{ src: '/login/poster16.png', bg: '#c95f2c'},
    //{ src: '/login/poster17.png', bg: '#d67613'},
    //{ src: '/login/poster18.png', bg: '#af3f16'},
    //{ src: '/login/poster19.png', bg: '#407a89'},
    //{ src: '/login/poster20.png', bg: '#1e7b5f'},
    //{ src: '/login/poster21.png', bg: '#133225'},
    //{ src: '/login/poster22.png', bg: '#c64a15'},
    { src: '/login/poster23.png', bg: '#e08d0a'},
    //{ src: '/login/poster24.png', bg: '#541e20'},
    //{ src: '/login/poster25.png', bg: '#362d1c'},
    //{ src: '/login/poster26.png', bg: '#c42e0a'},
    //{ src: '/login/poster27.png', bg: '#f59d09'},
    //{ src: '/login/poster28.png', bg: '#362d1c'},
    //{ src: '/login/poster29.png', bg: '#da8b1c'},
    //{ src: '/login/poster30.png', bg: '#e36d15'},
    //{ src: '/login/poster31.png', bg: '#301f13'},
    //{ src: '/login/poster32.png', bg: '#5d4727'},
    //{ src: '/login/poster33.png', bg: '#efac36'},
    //{ src: '/login/poster34.png', bg: '#35230e'},  
    //{ src: '/login/poster35.png', bg: '#dc8a13'},
    //{ src: '/login/poster36.png', bg: '#412913'},
    //{ src: '/login/poster37.png', bg: '#e49505'},
    //{ src: '/login/poster38.png', bg: '#e5b775'},
    //{ src: '/login/poster39.png', bg: '#0e3323'},
    //{ src: '/login/poster40.png', bg: '#dc670f'},
    //{ src: '/login/poster41.png', bg: '#603c12'},
    { src: '/login/poster42.png', bg: '#b13e0c'},
    //{ src: '/login/poster43.png', bg: '#0d151a'},
];

const POSTER_DELAY = 18000;

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const { login } = useAuth();

  const [index, setIndex] = useState(() => Math.floor(Math.random() * loginPosters.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loginPosters.length);
    }, POSTER_DELAY);
    return () => clearInterval(interval);
  }, []);

  const onFinish = useCallback(async (values: any) => {
    try {
      const res = await api.post('/auth/login', values);
      const { token, user } = res.data;
      login(token, user);
      navigate((location.state as any)?.from || '/projects');
    } catch {
      form.setFields([
        { name: 'email', errors: ['Invalid credentials'] },
        { name: 'password', errors: [' '] },
      ]);
    }
  }, [form, login, location.state, navigate]);

  const redirectOAuth = useCallback((provider: string) => {
    const next = encodeURIComponent(location.pathname);
    window.location.href = `/api/auth/${provider}?next=${next}`;
  }, [location.pathname]);

  const currentPoster = loginPosters[index];

  return (
    <div
      className={styles.loginPage}
      style={{ ['--poster-bg' as any]: currentPoster.bg }}
      aria-label="Login screen with rotating artwork"
    >
      <div className={styles.loginWrapper}>
        <div className={styles.formPanel}>
          <img src="/moteur-logo.svg" alt="Moteur logo" className={styles.logo} />

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            validateTrigger="onBlur"
            aria-label="Login form"
          >
            <Form.Item
              name="username"
              label="Email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
            >
              <Input type="email" autoFocus autoComplete="email" aria-label="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password autoComplete="current-password" aria-label="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block aria-label="Sign in">
                Sign in
              </Button>
            </Form.Item>
          </Form>

          <Divider>or</Divider>

          <div className={styles.oauthButtons}>
            <Button
              icon={<GithubOutlined />}
              onClick={() => redirectOAuth('github')}
              aria-label="Sign in with GitHub"
              className={styles.oauthButton}
            >
              GitHub
            </Button>
            <Button
              icon={<GoogleOutlined />}
              onClick={() => redirectOAuth('google')}
              aria-label="Sign in with Google"
              className={styles.oauthButton}
            >
              Google
            </Button>
          </div>

          <div className={styles.subtleLinks}>
            <a href="/forgot-password" aria-label="Forgot your password?">Forgot password?</a>
          </div>
        </div>
      </div>

      <div className={styles.poster} role="img" aria-label="Visual poster for login page">
        <div
          key={currentPoster.src}
          className={styles.posterImage}
          style={{ backgroundImage: `url(${currentPoster.src})` }}
        />
      </div>
    </div>
  );
}
