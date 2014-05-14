(function() {
  
  var scopes = {},
      forEach = [].forEach.call;
  
  
  function defineScope(scope, link) {
    if(!scopes[scope]) {
     scopes[scope] = link;
     return true;
    }
    
    return false;
  }
  
  function runScope(scope) {
    if(scopes[scope]) {
      var eScope = document.querySelectorAll('[data-scope=' + scope + ']');
      
      if(eScope.length > 0) {
        forEach(eScope, function(Element) {
          var All = Element.querySelectorAll('*');
          
          if(All.length > 0) {
            forEach(All, function(subElement) {
              if(subElement.innerHTML.match(/{{(.*?)}}/)) {
                subElement.innerHTML = subElement.innerHTML.replace(/{{(.*?)}}/g, function(Raw, Key) {
                  return scopes[scope][Key] ? scopes[scope][Key]: Raw;
                });
              }
            });
          }
        });
      }
    }
  }
  
  window.Scope = {
    defineScope: defineScope,
    runScope: runScope
  }
  
  window.addEventListener('DOMContentLoaded', function() {
    forEach(scopes, function(scope) {
      runScope(scope);
    });
  });
})();
