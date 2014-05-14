(function() {
  
  var scopes = {},
      forEach = [].forEach;
  
  
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
        forEach.call(eScope, function(Element) {
          var All = Element.querySelectorAll('*');
          
          if(All.length > 0) {
            forEach.call(All, function(subElement) {
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
    forEach.call(scopes, function(scope) {
      runScope(scope);
    });
  });
})();
