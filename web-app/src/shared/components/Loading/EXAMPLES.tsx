/**
 * Example implementations showing how to migrate existing components
 * to use the new loading components
 */

// ============================================
// EXAMPLE 1: Login Component Migration
// ============================================

// Before:
import { useState } from 'react';

const LoginOld = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await AuthService.login(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form>
      <button 
        className={`login-button ${loading ? 'loading' : ''}`} 
        disabled={loading}
      >
        {loading && <span className="spinner"></span>}
        {loading ? 'Signing in...' : 'Submit'}
      </button>
    </form>
  );
};

// After:
import { useLoading } from '@/hooks/useLoading';
import { LoadingButton } from '@/shared/components/Loading';

const LoginNew = () => {
  const { isLoading, withLoading } = useLoading();

  const handleSubmit = async (data: any) => {
    await withLoading(AuthService.login(data));
  };

  return (
    <form>
      <LoadingButton 
        loading={isLoading}
        loadingText="Signing in..."
        variant="contained"
        fullWidth
        onClick={handleSubmit}
      >
        Submit
      </LoadingButton>
    </form>
  );
};


// ============================================
// EXAMPLE 2: Profile Component Migration
// ============================================

// Before:
import { CircularProgress } from '@mui/material';

const ProfileOld = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    setIsLoading(true);
    try {
      const data = await UserService.get();
      setUser(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid item xs={3}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <UserForm user={user} />
      )}
    </Grid>
  );
};

// After:
import { useLoading } from '@/hooks/useLoading';
import { LoadingContainer } from '@/shared/components/Loading';

const ProfileNew = () => {
  const { isLoading, withLoading } = useLoading({ initialState: true });
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await withLoading(UserService.get());
    setUser(data);
  };

  return (
    <Grid item xs={3}>
      <LoadingContainer loading={isLoading}>
        <UserForm user={user} />
      </LoadingContainer>
    </Grid>
  );
};


// ============================================
// EXAMPLE 3: GridListView Migration
// ============================================

// Before:
const GridListViewOld = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <DataGrid rows={rows} columns={columns} />
      
      {loading && (
        <div style={{
          position: 'absolute',
          left: 0,
          top: 105,
          width: '100%',
          height: 'calc(100% - 105px)',
          background: 'rgba(255,255,255,0.5)',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="grid-spinner" />
        </div>
      )}
    </div>
  );
};

// After:
import { LoadingOverlay } from '@/shared/components/Loading';

const GridListViewNew = () => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingOverlay visible={loading} transparent>
      <DataGrid rows={rows} columns={columns} />
    </LoadingOverlay>
  );
};


// ============================================
// EXAMPLE 4: Form with Multiple Actions
// ============================================

import { useLoadingStates } from '@/hooks/useLoading';
import { LoadingButton } from '@/shared/components/Loading';

const CompanyForm = () => {
  const { loading, startLoading, stopLoading } = useLoadingStates();

  const handleSave = async (data: any) => {
    startLoading('save');
    try {
      await CompanyService.update(data);
    } finally {
      stopLoading('save');
    }
  };

  const handleDelete = async () => {
    startLoading('delete');
    try {
      await CompanyService.delete(id);
    } finally {
      stopLoading('delete');
    }
  };

  return (
    <form>
      {/* Form fields */}
      
      <LoadingButton 
        loading={loading.save}
        loadingText="Saving..."
        variant="contained"
        onClick={handleSave}
      >
        Save
      </LoadingButton>
      
      <LoadingButton 
        loading={loading.delete}
        loadingText="Deleting..."
        variant="outlined"
        color="error"
        onClick={handleDelete}
      >
        Delete
      </LoadingButton>
    </form>
  );
};


// ============================================
// EXAMPLE 5: List with Skeleton Loading
// ============================================

import { LoadingContainer, LoadingSkeleton } from '@/shared/components/Loading';

const CompanyList = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const skeleton = (
    <LoadingSkeleton type="rectangular" count={5} height={80} />
  );

  return (
    <LoadingContainer
      loading={loading}
      empty={companies.length === 0}
      emptyMessage="No companies found"
      skeleton={skeleton}
    >
      {companies.map(company => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </LoadingContainer>
  );
};


// ============================================
// EXAMPLE 6: Table with Skeleton
// ============================================

import { TableLoadingSkeleton } from '@/shared/components/Loading';

const QuoteTable = () => {
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState([]);

  if (loading) {
    return <TableLoadingSkeleton rows={10} columns={6} />;
  }

  return (
    <Table>
      <TableHead>...</TableHead>
      <TableBody>
        {quotes.map(quote => (
          <TableRow key={quote.id}>...</TableRow>
        ))}
      </TableBody>
    </Table>
  );
};


// ============================================
// EXAMPLE 7: Full Page Loading
// ============================================

import { PageLoader } from '@/shared/components/Loading';

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    await loadConfig();
    await checkAuth();
    setIsInitializing(false);
  };

  if (isInitializing) {
    return <PageLoader message="Initializing application..." />;
  }

  return <AppContent />;
};


// ============================================
// EXAMPLE 8: Inline Loading
// ============================================

import { InlineLoadingSpinner } from '@/shared/components/Loading';

const SaveStatus = ({ isSaving }: { isSaving: boolean }) => {
  if (isSaving) {
    return (
      <span>
        Saving <InlineLoadingSpinner size={16} />
      </span>
    );
  }
  return <span>All changes saved</span>;
};


// ============================================
// EXAMPLE 9: Modal with Loading
// ============================================

import { LoadingOverlay, LoadingButton } from '@/shared/components/Loading';
import { useLoading } from '@/hooks/useLoading';

const AddCompanyModal = ({ open, onClose }: any) => {
  const { isLoading, withLoading } = useLoading();

  const handleSubmit = async (data: any) => {
    await withLoading(CompanyService.create(data));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Company</DialogTitle>
      <LoadingOverlay visible={isLoading} message="Creating company...">
        <DialogContent>
          {/* Form fields */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <LoadingButton 
            loading={isLoading}
            loadingText="Creating..."
            onClick={handleSubmit}
          >
            Create
          </LoadingButton>
        </DialogActions>
      </LoadingOverlay>
    </Dialog>
  );
};
