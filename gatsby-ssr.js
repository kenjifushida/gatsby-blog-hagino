const React = require('react');

exports.onRenderBody = ({ setHeadComponents }) => {
    setHeadComponents([
        <script
            dangerouslySetInnerHTML={{
                __html: `
                (function() {
                    // Update the current theme to either 'light' or 'dark'
                    function setTheme(theme) {
                      window.__theme = theme;

                      if (theme === 'dark') {
                        document.documentElement.className = 'dark';
                      } else {
                        document.documentElement.className = '';
                      }

                      console.log('Theme updated:', theme);
                    };
                  
                    // Save the user's explicit theme preference.
                    // We're attaching this to window so we can access it anywhere.
                    // We'll need it later in this post.
                    window.__setPreferredTheme = function(theme) {
                      setTheme(theme);
                      try {
                        localStorage.setItem('preferred-theme', theme);
                      } catch (e) {}
                    };
                  
                    // Is there a Saved Theme Preference in localStorage?
                    let preferredTheme;
                    try {
                      preferredTheme = localStorage.getItem('preferred-theme');
                    } catch (e) {}
                  
                    // Is there an Operating System Preference?
                    let darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

                    setTheme(preferredTheme || (darkQuery.matches ? 'dark' : ''));
                  })();
                `,
            }}
        />,
    ]);
};