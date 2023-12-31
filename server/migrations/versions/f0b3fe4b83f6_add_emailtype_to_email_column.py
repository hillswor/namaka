"""Add EmailType to email column

Revision ID: f0b3fe4b83f6
Revises: 92c15424882d
Create Date: 2023-06-20 14:34:12.151685

"""
from alembic import op
import sqlalchemy as sa
import sqlalchemy_utils


# revision identifiers, used by Alembic.
revision = "f0b3fe4b83f6"
down_revision = "92c15424882d"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.alter_column(
            "email",
            existing_type=sa.VARCHAR(length=254),
            type_=sqlalchemy_utils.types.email.EmailType(length=255),
            existing_nullable=True,
        )

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.alter_column(
            "email",
            existing_type=sqlalchemy_utils.types.email.EmailType(length=255),
            type_=sa.VARCHAR(length=254),
            existing_nullable=True,
        )

    # ### end Alembic commands ###
