var CodeEditorConfig = {
  DOMAIN_URL: '{{ getenv "convergence_realtime_url" }}/domain/{{ getenv "code_editor_namespace" }}/{{ getenv "code_editor_domain" }}',
  ANONYMOUS_LOGIN: {{ getenv anonymous_auth }},
  DEBUG: false
};