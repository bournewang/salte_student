if [ ! $# -eq 1 ]; then
  echo "Usage: $0 update_log"
  exit 1
fi

code-push release-react salte_student-android android --des "$1"
