import React, { useState } from 'react';
import Button from './Button';
import Icon from '../AppIcon';

const QuickActionToolbar = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // In real implementation, trigger download
      console.log('Export completed');
    }, 2000);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // In real implementation, save to user preferences
    console.log(`View ${bookmarked ? 'unbookmarked' : 'bookmarked'}`);
  };

  const handleRefresh = () => {
    // In real implementation, refresh current dashboard data
    console.log('Refreshing dashboard data');
  };

  const handleShare = () => {
    // In real implementation, generate shareable link
    navigator.clipboard.writeText(window.location.href);
    console.log('Dashboard link copied to clipboard');
  };

  const primaryActions = [
    {
      id: 'refresh',
      icon: 'RefreshCw',
      label: 'Refresh',
      onClick: handleRefresh,
      tooltip: 'Refresh dashboard data'
    },
    {
      id: 'export',
      icon: 'Download',
      label: 'Export',
      onClick: handleExport,
      loading: isExporting,
      tooltip: 'Export current view'
    },
    {
      id: 'bookmark',
      icon: bookmarked ? 'BookmarkCheck' : 'Bookmark',
      label: bookmarked ? 'Bookmarked' : 'Bookmark',
      onClick: handleBookmark,
      variant: bookmarked ? 'default' : 'ghost',
      tooltip: 'Bookmark this view'
    }
  ];

  const secondaryActions = [
    {
      id: 'share',
      icon: 'Share2',
      label: 'Share',
      onClick: handleShare,
      tooltip: 'Share dashboard link'
    },
    {
      id: 'print',
      icon: 'Printer',
      label: 'Print',
      onClick: () => window.print(),
      tooltip: 'Print current view'
    },
    {
      id: 'fullscreen',
      icon: 'Maximize2',
      label: 'Fullscreen',
      onClick: () => {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        }
      },
      tooltip: 'Enter fullscreen mode'
    }
  ];

  return (
    <div className="flex items-center space-x-2">
      {/* Primary Actions - Always Visible */}
      <div className="hidden md:flex items-center space-x-1">
        {primaryActions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant || 'ghost'}
            size="sm"
            iconName={action.icon}
            onClick={action.onClick}
            loading={action.loading}
            title={action.tooltip}
            className="transition-smooth"
          >
            <span className="hidden lg:inline ml-1">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* More Actions Dropdown */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreHorizontal"
          onClick={() => setShowMoreActions(!showMoreActions)}
          title="More actions"
          className="transition-smooth"
        />

        {showMoreActions && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-modal z-[1150] animate-fade-in">
            <div className="py-2">
              {/* Mobile: Show primary actions */}
              <div className="md:hidden">
                {primaryActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => {
                      action.onClick();
                      setShowMoreActions(false);
                    }}
                    disabled={action.loading}
                    className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name={action.icon} size={16} />
                    <span>{action.label}</span>
                    {action.loading && (
                      <Icon name="Loader2" size={14} className="animate-spin ml-auto" />
                    )}
                  </button>
                ))}
                <div className="border-t border-border my-2"></div>
              </div>

              {/* Secondary actions */}
              {secondaryActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => {
                    action.onClick();
                    setShowMoreActions(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name={action.icon} size={16} />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {showMoreActions && (
        <div
          className="fixed inset-0 z-[1140]"
          onClick={() => setShowMoreActions(false)}
        />
      )}
    </div>
  );
};

export default QuickActionToolbar;