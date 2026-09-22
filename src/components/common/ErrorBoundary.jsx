import { Component } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineOutlined';

/**
 * ErrorBoundary 컴포넌트 — 하위 트리 렌더링 중 발생한 에러를 잡아 대체 화면을 보여준다.
 *
 * Props:
 * @param {node} children - 감시할 하위 트리 [Required]
 *
 * Example usage:
 * <ErrorBoundary><App /></ErrorBoundary>
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('렌더링 중 에러가 발생했습니다:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          role="alert"
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            background: 'var(--color-bg-secondary)',
            px: 3,
            textAlign: 'center',
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 48, color: '#EF4444' }} />
          <Typography sx={{ color: 'var(--color-text-primary)', fontWeight: 700, fontSize: '1.2rem' }}>
            문제가 발생했습니다
          </Typography>
          <Typography sx={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', maxWidth: 400 }}>
            페이지를 표시하는 중 오류가 생겼어요. 새로고침 후 다시 시도해 주세요.
          </Typography>
          <Button
            onClick={this.handleReload}
            variant="contained"
            sx={{
              mt: 1,
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
              '&:hover': { background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-accent))' },
            }}
          >
            새로고침
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
